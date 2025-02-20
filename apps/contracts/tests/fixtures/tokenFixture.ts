import hre from "hardhat";
import { ethers } from "ethers";
import { RahatAccessManager, RahatToken, ERC2771Forwarder, } from '../../typechain-types'

export interface TokenFixture {
    accessManager: RahatAccessManager;
    rumsanForwarder: ERC2771Forwarder;
    rahatToken: RahatToken;
    deployer: ethers.Signer;
    signers: ethers.Signer[];
}
export const deployRahatTokenFixture = async function (): Promise<TokenFixture> {
    console.log("deploying fixtures");
    const [deployer, ...signers] = await hre.ethers.getSigners();
    const rumsanForwarder = await hre.ethers.deployContract("ERC2771Forwarder", ['rumsanForwarder']);
    const accessManager = await hre.ethers.deployContract("RahatAccessManager", [deployer.address]);
    const rahatToken = await hre.ethers.deployContract("ProjectToken", ["Rahat", "RTH", "Rahat Token", 0, 0, deployer.address, accessManager.target, rumsanForwarder.target]);

    return {
        rumsanForwarder,
        accessManager,
        rahatToken,
        deployer,
        signers
    };
}