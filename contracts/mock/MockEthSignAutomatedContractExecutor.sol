//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "../IAtroposAutomatedContractExecutor.sol";

contract MockAtroposAutomatedContractExecutor is
    IAtroposAutomatedContractExecutor
{
    function execute(
        address receiver,
        bytes32 documentKey,
        string calldata getRequest,
        string calldata path,
        uint256 result
    ) external override returns (bool) {
        return true;
    }
}
