/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * truffleframework.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');
const wrapProvider = require('arb-ethers-web3-bridge').wrapProvider

const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
const kit = ContractKit.newKitFromWeb3(web3);

const celoAwaitWrapper = async () => {
	kit.addAccount("");
}

// celoAwaitWrapper();

module.exports = {
	// contracts_build_directory: './react-app/src/artifacts',

	networks: {
		// Useful for testing. The `development` name is special - truffle uses it by default
		// if it's defined here and no other network is specified at the command line.
		// You should run a client (like ganache-cli, geth or parity) in a separate terminal
		// tab if you use this network and you must also set the `host`, `port` and `network_id`
		// options below to some value.
		//
		// Testnets
		development: {
			host: '127.0.0.1', // Localhost (default: none)
			port: 8545, // Standard Ethereum port (default: none)
			network_id: 1337, // Any network (default: none)
		},
		matic_mumbai: {
			provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.matic.today`),
			network_id: 80001,
			confirmations: 2,
			timeoutBlocks: 200,
			skipDryRun: true
		},
		avalanche_fuji_c: {
			provider: () => new HDWalletProvider(mnemonic, `https://api.avax-test.network/ext/bc/C/rpc`),
			// network_id: 43113,
			network_id: "*",
			skipDryRun: true,
			// gas: 3000000,
			gasPrice: 470000000000,
			timeoutBlocks: 60
		},
		moonbeam_alpha: {
			provider: () => new HDWalletProvider(mnemonic, `https://rpc.testnet.moonbeam.network`),
			network_id: 1287,
			// skipDryRun: true,
			// websockets: true
		},
		bsc_testnet: {
			provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
			network_id: 97,
			confirmations: 3,
			timeoutBlocks: 200,
			skipDryRun: true,
			gasPrice: 10000000000
		},
		fantom_testnet: {
			provider: () => new HDWalletProvider(mnemonic, `https://rpc.testnet.fantom.network/`),
			network_id: 0xfa2,
			skipDryRun: true,
		},
		heco_testnet: {
			provider: () => new HDWalletProvider(mnemonic, 'https://http-testnet.hecochain.com'),
			network_id: 256
		},
		aurora: {
			provider: () => new HDWalletProvider(mnemonic, 'https://testnet.aurora.dev'),
			network_id: 0x4e454153,
			gas: 10000000
		},
		ropsten: {
			provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/59e38e7a0505462d810e0ac606665fd1`),
			network_id: 3,       // Ropsten's id
			gas: 5500000,        // Ropsten has a lower block limit than mainnet
			confirmations: 2,    // # of confs to wait between deployments. (default: 0)
			timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
			skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
		},
		kovan: {
			provider: () => new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/59e38e7a0505462d810e0ac606665fd1`),
			gas: 5000000,
			gasPrice: 25000000000,
			network_id: 42
		},
		celo_alfajores: {
			provider: kit.web3.currentProvider,
			network_id: 44787
		},
		arbitrum_testnet: {
			provider: () => wrapProvider(new HDWalletProvider(mnemonic, `https://rinkeby.arbitrum.io/rpc`)),
			network_id: '*',
			gasPrice: 0
		},
		okex_testnet: {
			provider: () => new HDWalletProvider(mnemonic, `https://exchaintestrpc.okex.org`),
			network_id: 65,
			confirmations: 10,
			timeoutBlocks: 200,
			skipDryRun: true
		},
		// Mainnets
		bsc: {
			provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
			network_id: 56,
			confirmations: 1,
			timeoutBlocks: 200,
			gasPrice: 7000000000,
			skipDryRun: true
		},
		ethereum: {
			provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/59e38e7a0505462d810e0ac606665fd1`),
			network_id: 1,
			gas: 5500000,
			gasPrice: 24000000000,
			confirmations: 1,
			skipDryRun: true
		},
		avalanche: {
			provider: () => new HDWalletProvider(mnemonic, `https://api.avax.network/ext/bc/C/rpc`),
			// network_id: 43114,
			network_id: "*",
			skipDryRun: true,
			gasPrice: 470000000000
		},
		fantom: {
			provider: () => new HDWalletProvider(mnemonic, `https://rpcapi.fantom.network`),
			network_id: 250,
			skipDryRun: true,
			gasPrice: 72000000000
		},
		matic: {
			provider: () => new HDWalletProvider(mnemonic, `https://rpc-mainnet.matic.network`),
			network_id: 137,
			confirmations: 2,
			skipDryRun: true
		}
	},

	// Set default mocha options here, use special reporters etc.
	mocha: {
		timeout: 120000
	},

	// Configure your compilers
	compilers: {
		solc: {
			version: '0.8.0', // Fetch exact version from solc-bin (default: truffle's version)
			// docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
			settings: {          // See the solidity docs for advice about optimization and evmVersion
				optimizer: {
					enabled: true,
					runs: 200
				},
				//  evmVersion: "byzantium"
			}
		},
	},
};
