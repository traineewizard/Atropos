//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

interface IAtroposAutomatedContract {
    event AtroposUpkeepPerformed();
    event AtroposResultReceived(bytes32 expected, bytes32 actual);
    event AtroposExecutionTriggered(address executor, uint256 numberOfTrigger);
}
