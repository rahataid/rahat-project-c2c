import { ContractLib } from './_common';

class ProjectFundManagement extends ContractLib {
  public async addProjectToCommunity() {
    const projectAddress = await this.getDeployedContractDetails(
      process.env.PROJECT_ID as string,
      ['C2CProject', 'RahatCommunity']
    );
    const communityWallet = this.getCommunityWallet();
    const communityContract = await this.getCommunityContract(communityWallet);
    return communityContract.approveProject(projectAddress.C2CProject.address);
  }

  public async isRegisteredProject() {
    const projectAddress = await this.getDeployedContractDetails(
      process.env.PROJECT_ID as string,
      ['C2CProject', 'RahatCommunity']
    );
    const communityWallet = this.getCommunityWallet();
    console.log('communityWallet', communityWallet);
    const communityContract = await this.getCommunityContract(communityWallet);
    console.log('communityContract', communityContract);
    const isProject = await communityContract.isProject(
      projectAddress.C2CProject.address
    );

    console.log('isProject', isProject);

    return isProject;
  }

  public async sendFundToProjects(tokenMintAmount: string) {
    const donorWallet = await this.getDonorWallet();
    const projectAddress = await this.getDeployedContractDetails(
      process.env.PROJECT_ID as string,
      ['C2CProject', 'RahatToken']
    );
    console.log('projectAddress', projectAddress);
    const donorContract = await this.getDonorContract(donorWallet);
    console.log('this.deployedContracts', this.deployedContracts);
    console.log('donorContract', donorContract);
    return donorContract.mintTokenAndApprove(
      projectAddress.RahatToken.address,
      projectAddress.C2CProject.address,
      tokenMintAmount
    );
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
  const addProjectToCommunity =
    await projectFundManagement.addProjectToCommunity();
  console.log(addProjectToCommunity);
  console.log(isRegistered);
  // const c = await projectFundManagement.sendFundToProjects(tokenMintAmount);
  // console.log(c);
  // await projectFundManagement.acceptToken(tokenMintAmount);
  // const balance = await projectFundManagement.checkBalance();
  // console.log(balance, 'Added to project');
  // process.exit(0);
})();
