//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../IAtroposAutomatedContractExecutor.sol";

contract MockAtroposAutomatedContractExecutor is
    IAtroposAutomatedContractExecutor,
    ReentrancyGuard
{
    address private _receiver;
    uint256 private _balance;

    constructor(address receiver) public payable {
        _receiver = receiver;
        _balance = msg.value;
    }

    function execute() external override nonReentrant returns (bool) {
        uint256 amount = _balance;
        _balance = 0;
        _receiver.call.value(amount)("");
        return true;
    }
}
