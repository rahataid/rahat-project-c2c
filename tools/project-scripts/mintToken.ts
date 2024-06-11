import { Signer, ethers } from 'ethers';
import { ContractLib } from './_common';

class MintToken extends ContractLib {
  private deployerWalletAddress: Signer;
  private projectUUID: string;
  constructor() {
    super();
    this.deployerWalletAddress = this.getWalletFromPrivateKey(
      this.deployerAddress
    );
    this.projectUUID = process.env.PROJECT_ID as string;
  }

  public async mintToken(tokenMintAmount: number, address: string) {
    console.log('----------Minting Token-------------------');
    const tx = await this.callContractMethod(
      'RahatToken',
      'mint',
      [address, ethers.parseEther(tokenMintAmount.toString())],
      this.projectUUID,
      this.deployerWalletAddress
    );

    return tx;
  }
}

(async () => {
  const mintToken = new MintToken();
  const tx = await mintToken.mintToken(
    12000000,
    '0x008E28BC0D95d2045eEA111E35aFcD0d0b150772'
  );
  console.log({ tx });
})();
