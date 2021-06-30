//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0; // We are only using 0.6.0 for Chainlink compatibility
pragma experimental ABIEncoderV2; // This is acceptable as it is used by default in Solidity 0.8.0.

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "./external/KeeperCompatibleInterface.sol";
import "./external/dai.sol";
import "./IAtroposAutomatedContractExecutor.sol";
import "./IAtroposAutomatedContract.sol";

contract AtroposAutomatedContract is
    Ownable,
    KeeperCompatibleInterface,
    ChainlinkClient,
    IAtroposAutomatedContract
{
    using SafeMath for uint256;

    // Kovan DAI
    Dai public constant _daiInstance =
        Dai(0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa);
    // Kovan LINK
    IERC20 public constant _linkInstance =
        IERC20(0xa36085F69e2889c224210F603D836748e7dC0088);

    address public _beneficiary;

    uint256 public _jobStartBlock;
    uint256 public _expiration;
    uint256 public _jobInterval;
    bytes32 private _jobId;
    address private _oracle;
    uint256 private _fee;

    string public _url;
    string[] public _milestones;
    uint256 public _milestonesIndex;
    uint256[] public _rewards;
    string public _path;
    bytes32 public _expectedResult;
    bool public _responsePending;
    uint256 public _jobLastRun;

    constructor(
        uint256 expiration, // seconds since epoch
        address beneficiary,
        string memory url,
        string[] memory milestones,
        uint256[] memory rewards,
        uint256 totalRewards,
        uint256 permitDeadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public {
        setPublicChainlinkToken();
        _beneficiary = beneficiary;
        _jobStartBlock = block.number;
        _jobLastRun = _jobStartBlock.sub(1);
        _expiration = expiration;
        _url = url;
        _milestones = milestones;
        _milestonesIndex = 0;
        _rewards = rewards;
        _path = "open_issues";
        _expectedResult = 0x0;
        _jobInterval = 6 * 60 * 60; // 6 hours
        _jobId = "50fc4215f89443d185b061e5d7af9490";
        _oracle = 0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e;
        _fee = 0.1 * 10**18;
        _responsePending = false;

        uint256 calculatedTotalRewards = 0;
        for (uint256 i = 0; i < rewards.length; ++i) {
            calculatedTotalRewards += rewards[i];
        }
        require(calculatedTotalRewards == totalRewards, "Reward mismatch");
        _daiInstance.permit(
            _msgSender(),
            address(this),
            _daiInstance.nonces(_msgSender()),
            permitDeadline,
            true,
            v,
            r,
            s
        );
        _daiInstance.transferFrom(_msgSender(), address(this), totalRewards);
    }

    function withdraw() external onlyOwner {
        require(_expiration < block.timestamp, "Not expired");
        uint256 remainingDai = _daiInstance.balanceOf(address(this));
        _daiInstance.transfer(owner(), remainingDai);
        uint256 remainingLink = _linkInstance.balanceOf(address(this));
        _linkInstance.transfer(owner(), remainingLink);
        emit AtroposFundsReclaimed(remainingDai, remainingLink);
    }

    function sendGetRequest() internal returns (bytes32 requestId) {
        require(!_responsePending, "REQ_PENDING");
        Chainlink.Request memory request = buildChainlinkRequest(
            _jobId,
            address(this),
            this.getCallback.selector
        );
        request.add("get", _url);
        request.add("path", _milestones[_milestonesIndex]);
        _responsePending = true;
        return sendChainlinkRequestTo(_oracle, request, _fee);
    }

    function getCallback(bytes32 requestId, bytes32 result)
        public
        recordChainlinkFulfillment(requestId)
    {
        _responsePending = false;
        emit AtroposResultReceived(_expectedResult, result);
        if (result != _expectedResult) return;
        uint256 rewards = _rewards[_milestonesIndex];
        _daiInstance.transfer(_beneficiary, rewards);
        ++_milestonesIndex;
        emit AtroposExecutionTriggered(
            _url,
            _milestones[_milestonesIndex],
            _beneficiary,
            rewards
        );
    }

    function checkUpkeep(bytes calldata checkData)
        external
        view
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
        bool jobCanRun = (block.number > _jobStartBlock) &&
            (block.number < _expiration);
        bool jobShouldRun = (block.number.sub(_jobLastRun)) >= _jobInterval;
        upkeepNeeded = jobCanRun && jobShouldRun;
        performData = checkData;
    }

    function performUpkeep(bytes calldata performData) external override {
        (bool upkeepNeeded, bytes memory p) = _checkUpkeep("0");
        require(upkeepNeeded, "Should not upkeep");
        emit AtroposUpkeepPerformed();
        _jobLastRun = block.number;
        sendGetRequest();
    }
}
