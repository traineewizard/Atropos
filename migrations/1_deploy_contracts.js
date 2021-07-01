// const AtroposAutomatedContract = artifacts.require("AtroposAutomatedContract");
const MockAtroposAutomatedContract = artifacts.require("MockAtroposAutomatedContract");
// const MockAtroposAutomatedContractExecutor = artifacts.require("MockAtroposAutomatedContractExecutor");

module.exports = async (deployer, accounts) => {

    // await deployer.deploy(AtroposAutomatedContract, 1, 10000000000, 2, 1, "0xad752d90098243f8a5c91059d3e5616c", "0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e", 0, "https://api.github.com/repos/EthSign/EthSign-3.0-API/milestones/1", "open_issues", 1);
    // await deployer.deploy(MockAtroposAutomatedContractExecutor, accounts[1], { from: accounts[0], value: "1000000000000000000" });


    // await deployer.deploy(AtroposAutomatedContract, 1, 10000000000, 2, 4, "0x50fc4215f89443d185b061e5d7af9490", "0x2f90A6D021db21e1B2A077c5a37B3C7E75D15b7e", 0, "https://api.github.com/repos/EthSign/EthSign-3.0-API/milestones/1", "description", "0x54657374206d696c6573746f6e65");

    await deployer.deploy(MockAtroposAutomatedContract, accounts[1], "https://api.github.com/repos/EthSign/EthSign-3.0-API/milestones/", ["1", "2"], [10, 10], 20);
};