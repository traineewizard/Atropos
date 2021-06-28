//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2; // This is acceptable as it is used by default in Solidity 0.8.0.

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "./external/KeeperCompatibleInterface.sol";
import "./IAtroposAutomatedContractExecutor.sol";
import "./IAtroposAutomatedContract.sol";

contract AtroposAutomatedContract is
    Ownable,
    KeeperCompatibleInterface,
    ChainlinkClient,
    IAtroposAutomatedContract
{
    using SafeMath for uint256;

    IAtroposAutomatedContractExecutor private _atroposExecutor;
    uint256 public _jobStartBlock;
    uint256 public _jobEndBlock;
    uint256 public _jobInterval;
    uint256 public _jobExpectedTriggers;
    bytes32 private _jobId;
    address private _oracle;
    uint256 private _fee;

    string[] public _urlMapping;
    uint256 public _urlMappingIndex;
    string[] public _pathMapping;
    bytes32[] public _expectedResultMapping;

    bool public _responsePending;
    uint256 public _jobLastRun;

    constructor(
        uint256 jobStartBlock,
        uint256 jobEndBlock,
        uint256 jobInterval,
        uint256 jobExpectedRuns,
        bytes32 jobId,
        address oracle,
        uint256 fee,
        string[] memory urls,
        string[] memory paths,
        bytes32[] memory expectedResults
    ) public {
        setPublicChainlinkToken();
        _jobStartBlock = jobStartBlock;
        _jobLastRun = _jobStartBlock.sub(1);
        _jobEndBlock = jobEndBlock;
        _jobInterval = jobInterval;
        _jobExpectedTriggers = jobExpectedRuns;
        _jobId = jobId;
        _oracle = oracle;
        _fee = 0.1 * 10**18;

        require(
            (urls.length == paths.length) &&
                (paths.length == expectedResults.length),
            "Bad url info"
        );
        _urlMappingIndex = 0;
        for (uint256 i = 0; i < urls.length; ++i) {
            _urlMapping[i] = urls[i];
        }
        for (uint256 i = 0; i < paths.length; ++i) {
            _pathMapping[i] = paths[i];
        }
        for (uint256 i = 0; i < expectedResults.length; ++i) {
            _expectedResultMapping[i] = expectedResults[i];
        }

        _responsePending = false;
    }

    // function setExecutor(IAtroposAutomatedContractExecutor atroposExecutor) external onlyOwner {
    //     require(address(_atroposExecutor) == address(0), "Executor set");
    //     _atroposExecutor = atroposExecutor;
    // }

    function sendGetRequest() internal returns (bytes32 requestId) {
        require(!_responsePending, "REQ_PENDING");
        Chainlink.Request memory request = buildChainlinkRequest(
            _jobId,
            address(this),
            this.getCallback.selector
        );
        request.add("get", _urlMapping[_urlMappingIndex]);
        request.add("path", _pathMapping[_urlMappingIndex]);
        _responsePending = true;
        return sendChainlinkRequestTo(_oracle, request, _fee);
    }

    function getCallback(bytes32 requestId, bytes32 result)
        public
        recordChainlinkFulfillment(requestId)
    {
        _responsePending = false;
        emit AtroposResultReceived(
            _expectedResultMapping[_urlMappingIndex],
            result
        );
        if (result != _expectedResultMapping[_urlMappingIndex]) return;
        ++_urlMappingIndex;
        emit AtroposExecutionTriggered(address(_atroposExecutor));
        // _atroposExecutor.execute();
    }

    function checkUpkeep(bytes calldata checkData)
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        // require(address(_atroposExecutor) != address(0), "Executor not set");
        bool jobCanRun = (block.number > _jobStartBlock) &&
            (block.number < _jobEndBlock);
        bool jobShouldRun = (block.number.sub(_jobLastRun)) >= _jobInterval;
        upkeepNeeded = jobCanRun && jobShouldRun;
        performData = checkData;
    }

    function performUpkeep(bytes calldata performData) external override {
        emit AtroposUpkeepPerformed();
        _jobLastRun = block.number;
        sendGetRequest();
    }
}
