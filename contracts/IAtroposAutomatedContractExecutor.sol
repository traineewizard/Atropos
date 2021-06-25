//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

interface IAtroposAutomatedContractExecutor {
    function execute(
        address receiver,
        bytes32 documentKey,
        string calldata getRequest,
        string calldata path,
        uint256 result
    ) external returns (bool);
}
