//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../IAtroposAutomatedContractExecutor.sol";
import "../IAtroposAutomatedContract.sol";

contract MockAtroposAutomatedContractExecutor is
    AccessControl,
    IAtroposAutomatedContractExecutor,
    ReentrancyGuard
{
    bytes32 public constant ATROPOS_ROLE = keccak256("ATROPOS_ROLE");

    address private _receiver;
    uint256 private _balance;

    constructor(
        IAtroposAutomatedContract atroposAutomatedContract,
        address receiver
    ) public payable {
        _setupRole(ATROPOS_ROLE, address(atroposAutomatedContract));
        _receiver = receiver;
        _balance = msg.value;
    }

    function execute() external override nonReentrant returns (bool) {
        require(hasRole(ATROPOS_ROLE, _msgSender()));
        uint256 amount = _balance;
        _balance = 0;
        _receiver.call.value(amount)("");
        return true;
    }
}
