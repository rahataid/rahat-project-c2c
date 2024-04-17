import { type Signer } from 'ethers';
import { ContractLib } from './_common';

const tokenMintAmount = 10000;

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
    if (tx)
      console.log(
        '----------Project Already Added To Community-------------------'
      );
    return tx;
  }

  public async mintToken(tokenMintAmount: number) {
    console.log('----------Mining Rahat Token -------------------');
    const mintTx = await this.callContractMethod(
      'RahatDonor',
      'mintTokenAndApprove',
      [
        await this.getRahatTokenAddress(),
        await this.getC2CAddress(),
        tokenMintAmount,
        await this.getC2CAddress(),
      ],
      this.projectUUID,
      this.fundDeployerAddress
    );

    if (mintTx) {
      console.log('Token minted successfully');
    }
  }

  public async getOwner() {
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
    console.log('----------Getting C2C Project Balance-------------------');
    const balance = await this.callContractMethod(
      'RahatDonor',
      'getBalance',
      [await this.getRahatTokenAddress(), await this.getC2CAddress()],
      this.projectUUID,
      this.fundDeployerAddress
    );
    console.log(balance.toString());
  }

  public async acceptToken() {
    console.log('----------Accepting token from Donor-------------------');
    const allowanceToProject = await this.callContractMethod(
      'RahatToken',
      'allowance',
      [await this.getRahatDonorAddress(), await this.getC2CAddress()],
      this.projectUUID,
      this.fundDeployerAddress
    );

    const acceptToken = await this.callContractMethod(
      'C2CProject',
      'acceptToken',
      [
        this.getRahatDonorAddress(),
        this.getRahatTokenAddress(),
        allowanceToProject,
      ],
      this.projectUUID,
      this.fundDeployerAddress
    );
    if (acceptToken) {
      console.log(`Token Accepted Successfully`);
    }
  }
}

export default ProjectFundManagement;

(async () => {
  const projectFundManagement = new ProjectFundManagement();
  const isRegistered = await projectFundManagement.isRegisteredProject();
  if (!isRegistered) {
    await projectFundManagement.addProjectToCommunity();
  }
  await projectFundManagement.getOwner();
  await projectFundManagement.mintToken(tokenMintAmount);
  await projectFundManagement.acceptToken();
  await projectFundManagement.getProjectBalance();
})();
