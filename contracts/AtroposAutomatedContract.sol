//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0; // We are only using 0.6.0 for Chainlink compatibility
pragma experimental ABIEncoderV2; // This is acceptable as it is used by default in Solidity 0.8.0.

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "./external/KeeperCompatibleInterface.sol";
import "./external/dai.sol";
import "./external/ERC2771Context.sol";
import "./IAtroposAutomatedContractExecutor.sol";
import "./IAtroposAutomatedContract.sol";


/**
 * @title AtroposAutomatedContract contract
 * @dev Automated escrow contract that releases fund when pre-configured github milestone is done.
 * Milestones and corresponding rewards is registered and transfered upon contract creation.
 * Then Chainlink keeper will periodically call the Chainlink oracle to check if the next
 * milestone is done. If so, the corresponding fund is released to a pre-configured receiver's address.
 * @author Atropos Team
 **/
contract AtroposAutomatedContract is
    Ownable,
    KeeperCompatibleInterface,
    ChainlinkClient,
    IAtroposAutomatedContract,
    ERC2771Context
{
    /**
    * @dev Biconomy gasless / stablcoin transaction related
    **/
    function setTrustedForwarder(address _forwarder) external onlyOwner {
        _trustedForwarder = _forwarder;
    }

    /**
    * @dev Biconomy gasless / stablcoin transaction related
    **/
    function _msgSender()
        internal
        view
        virtual
        override(Context, ERC2771Context)
        returns (address payable sender)
    {
        return super._msgSender();
    }

    /**
    * @dev Biconomy gasless / stablcoin transaction related
    **/
    function _msgData()
        internal
        view
        virtual
        override(Context, ERC2771Context)
        returns (bytes calldata)
    {
        return super._msgData();
    }

    using SafeMath for uint256;

    // Kovan DAI
    Dai public constant _daiInstance =
        Dai(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa);
    // Kovan LINK
    IERC20 public constant _linkInstance =
        IERC20(0xa36085F69e2889c224210F603D836748e7dC0088);

    address public _beneficiary;

    uint256 public _jobStartTime;
    uint256 public _expirationTime;
    uint256 public constant _jobIntervalSeconds = 12 * 60 * 60; // 12 hours
    bytes32 private constant _jobId = "50fc4215f89443d185b061e5d7af9490";
    address private constant _oracle =
        0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
    uint256 private constant _fee = 0.1 * 10**18;

    string public _url;
    string[] public _milestones;
    uint256 public _milestonesIndex;
    uint256[] public _rewards;
    string public constant _path = "open_issues";
    bytes32 public constant _expectedResult =
        0x3000000000000000000000000000000000000000000000000000000000000000;
    bool public _responsePending;
    uint256 public _jobLastRun;
    bool public _jobCompleted;

    /**
    * @dev Initialize a new escrow contract
    * @param expiration The address of the underlying asset to deposit
    * @param beneficiary Reciever of the fund when milestone is delivered
    * @param url Prefix of the github hub milestone api
    * @param milestones Milestone number array. Each concatenates with url is the corresponding
    * Github api that Chainlink oracle is going to query
    * @param rewards Rewards in dai of each milestone
    * @param totalRewards Total rewards of dai if all the milestones are delivered. 
    **/
    constructor(
        uint256 expiration, // seconds since epoch
        address beneficiary,
        string memory url,
        string[] memory milestones,
        uint256[] memory rewards,
        uint256 totalRewards
    ) public ERC2771Context(0xF82986F574803dfFd9609BE8b9c7B92f63a1410E) {
        setPublicChainlinkToken();
        _beneficiary = beneficiary;
        _jobStartTime = block.timestamp;
        _jobLastRun = _jobStartTime.sub(1);
        _expirationTime = expiration;
        _url = url;
        _milestones = milestones;
        _milestonesIndex = 0;
        _rewards = rewards;
        _responsePending = false;
        _jobCompleted = false;

        uint256 calculatedTotalRewards = 0;
        for (uint256 i = 0; i < rewards.length; ++i) {
            calculatedTotalRewards += rewards[i];
        }
        require(calculatedTotalRewards == totalRewards, "Reward mismatch");
        _daiInstance.transferFrom(_msgSender(), address(this), totalRewards);
        uint256 linkNeededForUpkeepsBeforeExpiration = ((expiration -
            block.timestamp) / _jobIntervalSeconds) * _fee;
        _linkInstance.transferFrom(
            _msgSender(),
            address(this),
            linkNeededForUpkeepsBeforeExpiration
        );
    }

    /**
    * @dev Either when some milestones expire or all milestones are done, 
    * project can withdraw the remaining dai (in the case expiration)
    * or link (in the case delivery in advance) from the contract
    **/
    function withdraw() external onlyOwner {
        require(_expirationTime < block.timestamp, "Not expired");
        uint256 remainingDai = _daiInstance.balanceOf(address(this));
        _daiInstance.transfer(owner(), remainingDai);
        uint256 remainingLink = _linkInstance.balanceOf(address(this));
        _linkInstance.transfer(owner(), remainingLink);
        emit AtroposFundsReclaimed(remainingDai, remainingLink);
    }

    /**
    * @dev Internal function to send a http request to Chainlink network
    * to check if a specific milestone is finished
    **/
    function sendGetRequest() internal returns (bytes32 requestId) {
        require(!_responsePending, "REQ_PENDING");
        Chainlink.Request memory request = buildChainlinkRequest(
            _jobId,
            address(this),
            this.getCallback.selector
        );
        request.add(
            "get",
            string(abi.encodePacked(_url, _milestones[_milestonesIndex]))
        );
        request.add("path", _path);
        _responsePending = true;
        return sendChainlinkRequestTo(_oracle, request, _fee);
    }

    /**
    * @dev Chainlink network callback. If the corresponding
    * milestone is finished, then release the fund
    **/
    function getCallback(bytes32 requestId, bytes32 result)
        public
        recordChainlinkFulfillment(requestId)
    {
        _responsePending = false;
        emit AtroposResultReceived(_expectedResult, result);
        if (result != _expectedResult) return;
        uint256 rewards = _rewards[_milestonesIndex];
        _daiInstance.transfer(_beneficiary, rewards);
        emit AtroposExecutionTriggered(
            _url,
            _milestones[_milestonesIndex],
            _beneficiary,
            rewards
        );
        ++_milestonesIndex;
        if (_milestonesIndex == _milestones.length - 1) {
            _jobCompleted = true;
            emit AtroposJobCompleted();
        }
    }

    /**
    * @dev If _jobIntervalSeconds is passed, schedule a keeper call
    **/
    function checkUpkeep(bytes calldata checkData)
        external
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        return _checkUpkeep(checkData);
    }

    function _checkUpkeep(bytes memory checkData)
        internal
        view
        returns (bool upkeepNeeded, bytes memory performData)
    {
        bool jobCanRun = (block.timestamp > _jobStartTime) &&
            (block.timestamp < _expirationTime);
        bool jobShouldRun = (block.timestamp.sub(_jobLastRun)) >=
            _jobIntervalSeconds;
        upkeepNeeded = jobCanRun && jobShouldRun;
        performData = checkData;
        if (_responsePending) upkeepNeeded = false;
        if (_jobCompleted) upkeepNeeded = false;
    }

    /**
    * @dev Entry point for Chainlink keeper
    * If _jobIntervalSeconds is passed, schedule a keeper call
    * to Chainlink network to query if the target milestone is
    * finished
    **/
    function performUpkeep(bytes calldata performData) external override {
        (bool upkeepNeeded, ) = _checkUpkeep("0");
        require(upkeepNeeded, "Should not upkeep");
        emit AtroposUpkeepPerformed();
        _jobLastRun = block.timestamp;
        sendGetRequest();
    }
}
