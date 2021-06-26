//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "../IAtroposAutomatedContractExecutor.sol";
import "../IAtroposAutomatedContract.sol";

contract MockERC20AtroposAutomatedContractExecutor is
    AccessControl,
    IAtroposAutomatedContractExecutor,
    ReentrancyGuard
{
    using SafeERC20 for IERC20;

    bytes32 public constant ATROPOS_ROLE = keccak256("ATROPOS_ROLE");

    address private _recipient;
    uint256 private _balance;
    IERC20 private _ierc20;

    constructor(
        IAtroposAutomatedContract atroposAutomatedContract,
        address recipient,
        IERC20 ierc20,
        uint256 amount
    ) public {
        _setupRole(ATROPOS_ROLE, address(atroposAutomatedContract));
        _recipient = recipient;
        _ierc20 = ierc20;
        _balance = amount;
        ierc20.transferFrom(_msgSender(), address(this), amount);
    }

    function execute() external override nonReentrant returns (bool) {
        require(hasRole(ATROPOS_ROLE, _msgSender()));
        uint256 amount = _balance;
        _balance = 0;
        _ierc20.safeTransfer(_recipient, amount);
        return true;
    }
}
