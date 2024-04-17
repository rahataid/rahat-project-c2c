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

    console.log('mintTx', mintTx);

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
      'RahatToken',
      'balanceOf',
      [await this.getRahatDonorAddress()],
      this.projectUUID,
      this.fundDeployerAddress
    );
    console.log({ balance });
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
  async getProjectBalance() {
    const deployerToAdminAllowance = await this.callContractMethod(
      'RahatToken',
      'allowance',
      [this.fundDeployerAddress, this.fundAdminAddress],
      this.projectUUID,
      this.fundDeployerAddress
    );

    const adminToProjectAllowance = await this.callContractMethod(
      'RahatToken',
      'allowance',
      [this.fundAdminAddress, await this.getC2CAddress()],
      this.projectUUID,
      this.fundDeployerAddress
    );

    const balance = await this.callContractMethod(
      'RahatDonor',
      'getBalance',
      [
        await this.getDeployedAddress(this.projectUUID, 'RahatToken'),
        this.fundDeployerAddress,
      ],
      this.projectUUID,
      this.fundDeployerAddress
    );
    return { balance, deployerToAdminAllowance, adminToProjectAllowance };
  }
  public async acceptToken(tokenMintAmount: number) {
    return this.callContractMethod(
      'C2CProject',
      'acceptToken',
      [tokenMintAmount],
      this.projectUUID
    );
  }

  // public async checkBalance(): Promise<number> {
  //   const tokenContract = await this.getErc20Contract();
  //   console.log('first', this.contracts.CVAProject);
  //   const balance = await tokenContract.balanceOf(this.contracts.CVAProject);
  //   return balance;
  // }
}

export default ProjectFundManagement;

const tokenMintAmount = 10000;

(async () => {
  const projectFundManagement = new ProjectFundManagement();
  const isRegistered = await projectFundManagement.isRegisteredProject();
  console.log(isRegistered);
  if (!isRegistered) {
    const isAdded = await projectFundManagement.addProjectToCommunity();
    console.log({ isAdded });
  }
  await projectFundManagement.mintToken(tokenMintAmount);
  await projectFundManagement.getProjectBalance();
  await projectFundManagement.acceptToken(tokenMintAmount);
  await projectFundManagement.getProjectBalance();
  await projectFundManagement.getOwner();
})();
