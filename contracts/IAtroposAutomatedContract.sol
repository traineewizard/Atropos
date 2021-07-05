//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

interface IAtroposAutomatedContract {
    event AtroposUpkeepPerformed();
    event AtroposResultReceived(bytes32 expected, bytes32 actual);
    event AtroposExecutionTriggered(
        string url,
        string milestone,
        address beneficiary,
        uint256 dai
    );
    event AtroposFundsReclaimed(uint256 dai, uint256 link);
    event AtroposJobCompleted();
}
