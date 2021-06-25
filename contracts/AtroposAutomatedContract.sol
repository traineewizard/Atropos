//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
import "./external/KeeperCompatibleInterface.sol";
import "./IAtroposAutomatedContractExecutor.sol";

contract AtroposAutomatedContract is
    KeeperCompatibleInterface,
    ChainlinkClient
{
    using SafeMath for uint256;

    IAtroposAutomatedContractExecutor private _atroposExecutor;
    bytes32 private _documentKey;
    uint256 public _jobStartBlock;
    uint256 public _jobEndBlock;
    uint256 public _jobInterval;
    uint256 public _jobExpectedTriggers;
    bytes32 private _jobId;
    address private _oracle;
    uint256 private _fee;
    string public _getRequest;
    string public _path;
    uint256 public _expectedResult;
    bool private _responsePending;

    uint256 public _jobLastRun;
    uint256 public _jobTriggers;

    constructor(
        IAtroposAutomatedContractExecutor ethsignExecutor,
        bytes32 documentKey,
        uint256 jobStartBlock,
        uint256 jobEndBlock,
        uint256 jobInterval,
        uint256 jobExpectedRuns,
        bytes32 jobId,
        address oracle,
        uint256 fee,
        string memory getRequest,
        string memory path,
        uint256 expectedResult
    ) public {
        setPublicChainlinkToken();
        _atroposExecutor = ethsignExecutor;
        _documentKey = documentKey;
        _jobStartBlock = jobStartBlock;
        _jobLastRun = _jobStartBlock.sub(1);
        _jobEndBlock = jobEndBlock;
        _jobInterval = jobInterval;
        _jobExpectedTriggers = jobExpectedRuns;
        _jobId = jobId;
        _oracle = oracle;
        _fee = fee;
        _getRequest = getRequest;
        _path = path;
        _expectedResult = expectedResult;
        _responsePending = false;
        _jobTriggers = 0;
    }

    function sendGetRequest() internal returns (bytes32 requestId) {
        require(!_responsePending, "REQ_PENDING");
        Chainlink.Request memory request = buildChainlinkRequest(
            _jobId,
            address(this),
            this.getCallback.selector
        );
        request.add("get", _getRequest);
        request.add("path", _path);
        _responsePending = true;
        return sendChainlinkRequestTo(_oracle, request, _fee);
    }

    function getCallback(bytes32 requestId, uint256 result)
        public
        recordChainlinkFulfillment(requestId)
    {
        _responsePending = false;
        if (result != _expectedResult) return;
        ++_jobTriggers;
        if (_jobExpectedTriggers > 0 && _jobTriggers >= _jobExpectedTriggers)
            return;
        _atroposExecutor.execute();
    }

    function checkUpkeep(bytes calldata checkData)
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        bool jobCanRun = (block.number > _jobStartBlock) &&
            (block.number < _jobEndBlock);
        bool jobShouldRun = (block.number.sub(_jobLastRun)) >= _jobInterval;
        upkeepNeeded = jobCanRun && jobShouldRun;
        performData = checkData;
    }

    function performUpkeep(bytes calldata performData) external override {
        _jobLastRun = block.number;
        sendGetRequest();
    }
}
