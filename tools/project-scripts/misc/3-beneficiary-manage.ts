import { Signer, ethers } from 'ethers';
import { ContractLib } from '../local-setup/_common';

const addresses = [
  '0x491A0ae888449A9cE02f3F4288EFD9D5065c16C9',
  '0x2751aAb31EF54CAFb4b2CB5F936e1aCf9EcDB1cf',
];

class BeneficiaryManagement extends ContractLib {
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

  private async getRahatTokenAddress(): Promise<string> {
    return this.getDeployedAddress(this.projectUUID, 'RahatToken');
  }

  async isRegisteredBeneficiary(beneficiaryAddress: string) {
    const tx = await this.callContractMethod(
      'RahatCommunity',
      'isBeneficiary',
      [beneficiaryAddress],
      this.projectUUID,
      this.fundDeployerAddress
    );
    if (tx)
      console.log(
        '----------Beneficiary Already Added To Community-------------------'
      );
    return tx;
  }

  async addBeneficiary(beneficiaryAddress: string) {
    console.log('----------Adding Beneficiary-------------------');
    const tx = await this.callContractMethod(
      'RahatCommunity',
      'addBeneficiary',
      [beneficiaryAddress],
      this.projectUUID,
      this.fundDeployerAddress
    );

    return tx;
  }

  async addBeneficiaryToC2CProject(beneficiaryAddress: string) {
    console.log(
      `----------Adding beneficiary ${beneficiaryAddress} to C2CProject-------------------`
    );
    const tx = await this.callContractMethod(
      'C2CProject',
      'addBeneficiary',
      [beneficiaryAddress],
      this.projectUUID,
      this.fundDeployerAddress
    );
    return tx;
  }

  async beneficiaryCount() {
    const tx = await this.callContractMethod(
      'C2CProject',
      'beneficiaryCount',
      [],
      this.projectUUID,
      this.fundDeployerAddress
    );
    console.log(`Total Beneficiaries: ${tx.toString()}`);
    return tx;
  }

  async removeBeneficiary(beneficiaryAddress: string) {
    console.log(`----------Removing Beneficiary -------------------`);
    const tx = await this.callContractMethod(
      'RahatCommunity',
      'removeBeneficiary',
      [beneficiaryAddress],
      this.projectUUID,
      this.fundDeployerAddress
    );
    console.log(`${beneficiaryAddress} removed from beneficiaries`);

    return tx;
  }

  async isBeneficiary(beneficiaryAddress: string) {
    console.log(`----------Is Beneficiary -------------------`);
    const tx = await this.callContractMethod(
      'C2CProject',
      'isBeneficiary',
      [beneficiaryAddress],
      this.projectUUID,
      this.fundDeployerAddress
    );
    console.log(`${beneficiaryAddress} : ${tx}`);
    return tx;
  }

  async getBeneficiaryClaims(beneficiaryAddress: string) {
    const tx = await this.callContractMethod(
      'C2CProject',
      'beneficiaryClaims',
      [beneficiaryAddress],
      this.projectUUID,
      this.fundDeployerAddress
    );

    console.log(`Beneficiary Claims(${beneficiaryAddress}): ${tx.toString()}`);
    return tx;
  }

  async totalClaimsAssigned() {
    const tx = await this.callContractMethod(
      'C2CProject',
      'totalClaimsAssigned',
      [],
      this.projectUUID,
      this.fundDeployerAddress
    );
    console.log(`Total Claims Assigned: ${tx.toString()}`);
    return tx;
  }

  async assignClaimsToBeneficiary(beneficiaryAddress: string, claims: BigInt) {
    console.log('----------Assigning Claims to Beneficiary-------------------');
    const tx = await this.callContractMethod(
      'C2CProject',
      'assignClaims',
      [beneficiaryAddress, this.getRahatTokenAddress(), claims],
      this.projectUUID,
      this.fundDeployerAddress
    );

    return tx;
  }

  async processTransferToBeneficiary(beneficiaryAddress: string) {
    console.log('----------Processing Token Transfer-------------------');

    const claim = ethers.parseEther('500');
    const tx = await this.callContractMethod(
      'C2CProject',
      'processTransferToBeneficiary',
      [beneficiaryAddress, await this.getRahatTokenAddress(), claim],
      this.projectUUID,
      this.fundAdminAddress
    );

    const isBeneficiary = await this.isRegisteredBeneficiary(
      beneficiaryAddress
    );
    if (isBeneficiary) {
      console.log(
        'Token transfer processed successfully to beneficiary: ',
        beneficiaryAddress + ' for amount: ' + claim
      );
    }

    return tx;
  }

  async getBeneficiaryBalance(beneficiaryAddress: string) {
    const balance = await this.callContractMethod(
      'RahatDonor',
      'getBalance',
      [await this.getRahatTokenAddress(), beneficiaryAddress],
      this.projectUUID,
      this.fundDeployerAddress
    );
    console.log(`Balance of ${beneficiaryAddress}: ${balance.toString()}`);
    return balance;
  }
}

(async () => {
  const beneficiaryManagement = new BeneficiaryManagement();

  for (const address of addresses) {
    const isRegisteredBeneficiary =
      await beneficiaryManagement.isRegisteredBeneficiary(address);

    if (!isRegisteredBeneficiary) {
      await beneficiaryManagement.addBeneficiary(address);
    }
    await beneficiaryManagement.addBeneficiaryToC2CProject(address);
    await beneficiaryManagement.isBeneficiary(address);
    // await beneficiaryManagement.assignClaimsToBeneficiary(
    //   address,
    //   ethers.parseEther('5')
    // );
    // await beneficiaryManagement.getBeneficiaryClaims(address);
  }

  await beneficiaryManagement.beneficiaryCount();
  // await beneficiaryManagement.totalClaimsAssigned();
  await beneficiaryManagement.processTransferToBeneficiary(addresses[0]);
  await beneficiaryManagement.processTransferToBeneficiary(addresses[1]);

  await beneficiaryManagement.getBeneficiaryBalance(addresses[0]);
  await beneficiaryManagement.getBeneficiaryBalance(addresses[1]);

  // await beneficiaryManagement.removeBeneficiary(addresses[1]);
})();
