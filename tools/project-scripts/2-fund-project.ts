import { type Signer } from 'ethers';
import { ContractLib } from './_common';

class ProjectFundManagement extends ContractLib {
  private fundDeployerAddress: Signer;
  private fundAdminAddress: Signer;
  private projectUUID: string;

  constructor() {
    super();
    this.fundDeployerAddress = this.getWalletFromPrivateKey(
      this.deployerAddress
    );
    this.fundAdminAddress = this.getWalletFromPrivateKey(this.adminAddress);
    this.projectUUID = process.env.PROJECT_ID as string;
  }

  private async getC2CAddress(): Promise<string> {
    return this.getDeployedAddress(this.projectUUID, 'C2CProject');
  }

  private async getRahatTokenAddress(): Promise<string> {
    return this.getDeployedAddress(this.projectUUID, 'RahatToken');
  }

  private async getRahatDonorAddress(): Promise<string> {
    return this.getDeployedAddress(this.projectUUID, 'RahatDonor');
  }

  public async addProjectToCommunity() {
    console.log('----------Adding Project To Community-------------------');
    const tx = await this.callContractMethod(
      'RahatCommunity',
      'approveProject',
      [await this.getC2CAddress()],
      this.projectUUID,
      this.fundDeployerAddress
    );

    return tx;
  }

  public async isRegisteredProject() {
    const tx = await this.callContractMethod(
      'RahatCommunity',
      'isProject',
      [await this.getC2CAddress()],
      this.projectUUID,
      this.fundDeployerAddress
    );
    console.log({ tx });
    return tx;
  }

  public async mintToken(tokenMintAmount: number) {
    const mintTx = await this.callContractMethod(
      'RahatDonor',
      'mintTokenAndApprove',
      [
        await this.getRahatTokenAddress(),
        this.fundAdminAddress,
        tokenMintAmount,
        await this.getC2CAddress(),
      ],
      this.projectUUID,
      this.fundDeployerAddress
    );

    if (mintTx) {
      console.log('Token minted successfully');
    }

    await this.callContractMethod(
      'RahatToken',
      'allowance',
      [this.fundDeployerAddress, this.fundAdminAddress],
      this.projectUUID,
      this.fundDeployerAddress
    );

    const balance = await this.callContractMethod(
      'RahatDonor',
      'getBalance',
      [await this.getRahatTokenAddress(), this.fundDeployerAddress],
      this.projectUUID,
      this.fundDeployerAddress
    );
    console.log({ balance });
  }

  public async sendFundToProjects(tokenMintAmount: string) {
    // const donorWallet = await this.getDonorWallet();
    // const projectAddress = await this.getDeployedContractDetails(
    //   process.env.PROJECT_ID as string,
    //   ['C2CProject', 'RahatToken']
    // );
    // console.log('projectAddress', projectAddress);
    // const donorContract = await this.getDonorContract(donorWallet);
    // return this.callContractMethod(
    //   'RahatDonor',
    //   'mintTokenAndApprove',
    //   [
    //     projectAddress.RahatToken.address,
    //     projectAddress.C2CProject.address,
    //     tokenMintAmount,
    //   ],
    //   'RahatDonor',
    //   process.env.PROJECT_ID as string,
    //   donorWallet
    // );
    // return donorContract.mintTokenAndApprove(
    //   projectAddress.RahatToken.address,
    //   projectAddress.C2CProject.address,
    //   tokenMintAmount
    // );
    // const donorContract = await this.getDeployerContract(donorWallet);
    // const deployedContractDetails = await this.getDeployedContractDetails();
    // console.log('first', donorContract);
    // return donorContract.mintTokenAndApprove(
    //   this.this.deployedContracts.CVAProject,
    //   tokenMintAmount
    // );
    // const donorContract = await this.getDonorContract(donorWallet);
    // console.log(
    //   'first',
    //   this.contracts.RahatToken,
    //   this.contracts.CVAProject,
    //   tokenMintAmount
    // );
    // return donorContract.mintTokenAndApprove(
    //   this.contracts.RahatToken,
    //   this.contracts.CVAProject,
    //   tokenMintAmount
    // );
  }

  public async getOwner() {
    console.log(await this.fundDeployerAddress);
    const owner = await this.callContractMethod(
      'RahatDonor',
      'isOwner',
      [this.fundDeployerAddress],
      this.projectUUID,
      this.fundDeployerAddress
    );

    console.log({ owner });
  }

  // public async acceptToken(tokenMintAmount: string) {
  //   const adminWallet = await this.getAdminWallet();
  //   const cvaProjectContract = await this.getCvaProjectContract(adminWallet);
  //   return cvaProjectContract.acceptToken(
  //     this.contracts.RahatDonor,
  //     tokenMintAmount
  //   );
  // }

  // public async checkBalance(): Promise<number> {
  //   const tokenContract = await this.getErc20Contract();
  //   console.log('first', this.contracts.CVAProject);
  //   const balance = await tokenContract.balanceOf(this.contracts.CVAProject);
  //   return balance;
  // }
}

export default ProjectFundManagement;

const tokenMintAmount = '10000';

(async () => {
  const projectFundManagement = new ProjectFundManagement();
  const isRegistered = await projectFundManagement.isRegisteredProject();
  console.log(isRegistered);
  if (!isRegistered) {
    const isAdded = await projectFundManagement.addProjectToCommunity();
    console.log({ isAdded });
  }
  await projectFundManagement.mintToken(20);
  await projectFundManagement.getOwner();
  // const addProjectToCommunity =
  //   await projectFundManagement.addProjectToCommunity();
  // console.log({ addProjectToCommunity });
  // console.log({ isRegistered });
  // const c = await projectFundManagement.sendFundToProjects(tokenMintAmount);
  // console.log(c);
  // await projectFundManagement.acceptToken(tokenMintAmount);
  // const balance = await projectFundManagement.checkBalance();
  // console.log(balance, 'Added to project');
  // process.exit(0);
})();
