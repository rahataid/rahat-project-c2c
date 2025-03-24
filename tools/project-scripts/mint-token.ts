import { Signer, parseEther } from 'ethers';
import { ContractLib } from './_common';

class MintToken extends ContractLib {
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

  public async mintToken(address: string, tokenMintAmount: number) {
    const mintTx = await this.callContractMethod(
      'RahatDonor',
      'addTokenOwner',
      [
        await this.getRahatTokenAddress(),
        await this.fundAdminAddress.getAddress(),

        // '0xAC6bFaf10e89202c293dD795eCe180BBf1430d7B',
        // parseEther(tokenMintAmount.toString()),
        // await this.getC2CAddress(),
      ],
      this.projectUUID,
      this.fundDeployerAddress
    );
    console.log('----------Minting Token-------------------');
    const tx = await this.callContractMethod(
      'RahatToken',
      'mint',
      [address, parseEther('50')],
      this.projectUUID,
      this.fundAdminAddress
    );
    return tx;
  }
}

(async () => {
  const mintToken = new MintToken();
  await mintToken.mintToken('0xcDEe632FB1Ba1B3156b36cc0bDabBfd821305e06', 50);
})();
