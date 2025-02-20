import hre from "hardhat";
import { ethers } from "ethers";
import { RahatAccessManager, RahatToken, ERC2771Forwarder, C2CProject } from '../../typechain-types'
export interface C2CFixture {
    rahatToken: RahatToken;
    c2cProject: C2CProject;
    accessManager: RahatAccessManager;
    deployer: ethers.Signer;
    admin: ethers.Signer;
    notAdmin: ethers.Signer;
    beneficiary: ethers.Signer;
}

export const deployC2CFixture = async function (): Promise<C2CFixture> {
    //@ts-ignore
    const [deployer, admin, notAdmin, beneficiary] = await hre.ethers.getSigners();
    const rumsanForwarder = await hre.ethers.deployContract("ERC2771Forwarder", ['rumsanForwarder']);
    const accessManager = await hre.ethers.deployContract("RahatAccessManager", [deployer.address]);
    const rahatToken = await hre.ethers.deployContract("RahatToken", ["Rahat", "RTH", "Rahat Token", 0, 0, deployer.address, accessManager.target, rumsanForwarder.target]);
    const c2cProject = await hre.ethers.deployContract("C2CProject", ['c2c', accessManager.target, rumsanForwarder.target]);
    await accessManager.connect(deployer).grantRole(0, admin.address, 0);

    return {
        rahatToken,
        c2cProject,
        deployer,
        admin,
        notAdmin,
        accessManager,
        beneficiary
    };
}