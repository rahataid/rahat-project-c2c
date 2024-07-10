import { Signer } from 'ethers';
import { ContractLib } from '../local-setup/_common';

const tokenMintAmount = 1000;

class AddressFundManagment extends ContractLib {
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

  public async listOwner() {
    console.log('----------List Owner-------------------');
    const tx = await this.callContractMethod(
      'RahatDonor',
      'listOwners',
      [],
      this.projectUUID,
      this.fundDeployerAddress
    );
    return tx;
  }

  public async mintToken(tokenMintAmount: number) {
    console.log('----------Minting Token-------------------');
    const tx = await this.callContractMethod(
      'RahatToken',
      'mint',
      [
        '0x17469fF5Bdc86a5FCeb4604534fF2a47a821d421',
        tokenMintAmount.toString(),
      ],
      this.projectUUID,
      this.fundDeployerAddress
    );

    return tx;
  }
}

(async () => {
  const addressFundManagment = new AddressFundManagment();
  const trans = await addressFundManagment.listOwner();
  console.log({ trans });
  const tx = await addressFundManagment.mintToken(tokenMintAmount);
  console.log({ tx });
})();
