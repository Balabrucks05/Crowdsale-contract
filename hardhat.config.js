require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
const {RPC_URL,PRIVATE_KEY,ETHERSCAN_API_KEY} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  defaultNetwork: "holesky",
  gasPrice: 30000000000,
  networks: {
    holesky: {
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  sourcify: {
    enabled: true
  },
  etherscan: {
    apiKey:{
      holesky: ETHERSCAN_API_KEY,
    },
  }
};
