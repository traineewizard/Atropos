const AtroposAutomatedContract = artifacts.require("AtroposAutomatedContract");
const MockAtroposAutomatedContractExecutor = artifacts.require("MockAtroposAutomatedContractExecutor");

module.exports = async (deployer, accounts) => {
    await deployer.deploy(MockAtroposAutomatedContractExecutor, accounts[1], { from: accounts[0], value: "1000000000000000000" });
    
};