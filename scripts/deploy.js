const { ethers } = require("hardhat");

async function main() {
    // Get the signer's account
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the contract factory for MyToken
    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy(); 

    console.log("Token deployed to:", token.address);

    // Deploy the crowdsale contract
    const Crowdsale = await ethers.getContractFactory("Crowdsale");
    const rate = 100;
    const wallet = deployer.address;
    const crowdsale = await Crowdsale.deploy(rate, wallet, token.address);

    console.log("Crowdsale contract deployed to:", crowdsale.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
