import { Signer } from 'ethers';
import { ContractLib } from './_common';

const addresses = [
  '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  '0x17469fF5Bdc86a5FCeb4604534fF2a47a821d421',
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

  async getBeneficiaryClaims(beneficiaryAddress: string) {
    const tx = await this.callContractMethod(
      'C2CProject',
      'beneficiaryClaims',
      [beneficiaryAddress],
      this.projectUUID,
      this.fundDeployerAddress
    );
    console.log({ tx });
    return tx;
  }

  async assignClaimsToBeneficiary(beneficiaryAddress: string, claims: number) {
    console.log('----------Assigning Claims to Beneficiary-------------------');
    const tx = await this.callContractMethod(
      'C2CProject',
      'assignClaims',
      [beneficiaryAddress, claims],
      this.projectUUID,
      this.fundAdminAddress
    );

    return tx;
  }

  async processTokenTransfer(beneficiaryAddress: string, tokenAmount: number) {
    console.log('----------Processing Token Transfer-------------------');
    const tx = await this.callContractMethod(
      'C2CProject',
      'processTransferToBeneficiary',
      [beneficiaryAddress, tokenAmount],
      this.projectUUID,
      this.fundAdminAddress
    );

    const isBeneficiary = await this.isRegisteredBeneficiary(
      beneficiaryAddress
    );
    if (isBeneficiary) {
      console.log(
        'Token transfer processed successfully to beneficiary: ',
        beneficiaryAddress + ' for amount: ' + tokenAmount
      );
    }

    return tx;
  }

  async getProjectBalance() {
    const allowance = await this.callContractMethod(
      'RahatToken',
      'allowance',
      [this.fundDeployerAddress, this.fundAdminAddress],
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
    return { balance, allowance };
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
  }

  await beneficiaryManagement.beneficiaryCount();
  await beneficiaryManagement.removeBeneficiary(addresses[1]);
  await beneficiaryManagement.beneficiaryCount();

  // const projectBalance = await beneficiaryManagement.getProjectBalance();
  // console.log('projectBalance', projectBalance);

  // const addBeneficiary = await beneficiaryManagement.addBeneficiary(
  //   beneficiaryAddress
  // );
  // console.log({ addBeneficiary });

  // const removeBeneficiary = await beneficiaryManagement.removeBeneficiary(
  //   beneficiaryAddress
  // );
  // console.log({ removeBeneficiary });

  // const beneficiaryClaims = await beneficiaryManagement.getBeneficiaryClaims(
  //   beneficiaryAddress
  // );
  // console.log({ beneficiaryClaims });

  // const assignClaimsToBeneficiary =
  //   await beneficiaryManagement.assignClaimsToBeneficiary(
  //     beneficiaryAddress,
  //     1
  //   );

  // console.log({ assignClaimsToBeneficiary });

  // console.log('claimsAssigned', {
  //   beneficiaryClaims,
  // });

  // const processTokenTransfer = await beneficiaryManagement.processTokenTransfer(
  //   beneficiaryAddress,
  //   tokenAmount
  // );
  // console.log({ processTokenTransfer });
  // console.log('claims', { beneficiaryClaims });
})();
