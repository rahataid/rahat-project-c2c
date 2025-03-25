import { Prisma, PrismaClient } from '@prisma/client';
import { SettingsService } from '@rumsan/extensions/settings';
import { PrismaService } from '@rumsan/prisma';
import { randomBytes } from 'crypto';
import * as dotenv from 'dotenv';
import { uuidV4 } from 'ethers';
import { writeFileSync } from 'fs';
import { ContractLib } from './_common';
dotenv.config();

const prismaClient = new PrismaClient({
  datasourceUrl: process.env.CORE_DATABASE_URL as string,
});

const SETTINGS_DB_NAME = 'C2C_DEV';

const prisma = new PrismaService();
const settings = new SettingsService(prisma);

const contractName = ['RahatToken', 'C2CProject'];

const rahatTokenDetails = {
  name: 'USD Coin',
  symbol: 'USDC',
  decimals: 18,
};

const communityName = 'Rumsan Community';

class SeedProject extends ContractLib {
  private projectUUID: string;

  constructor() {
    super();
    this.projectUUID = process.env.PROJECT_ID as string;
  }

  static getUUID() {
    return uuidV4(randomBytes(16));
  }

  public sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async deployC2CContracts() {
    const deployerAccount = this.getWalletFromPrivateKey(this.deployerKey);

    console.log('----------Deploying Rahat Token-------------------');
    const TokenContract = await this.deployContract('RahatToken', [
      rahatTokenDetails.name,
      rahatTokenDetails.symbol,
      deployerAccount.address,
      rahatTokenDetails.decimals,
    ]);
    console.log({
      TokenContract: TokenContract.contract.target,
      blockNumber: TokenContract.blockNumber,
    });

    console.log('----------Deploying C2C Project Contract-------------------');
    const C2CProjectContract = await this.deployContract('C2CProject', [
      'C2C Project',
    ]);
    console.log({
      C2CProjectContract: C2CProjectContract.contract.target,
      blockNumber: C2CProjectContract.blockNumber,
    });

    console.log('Writing deployed address to file');
    writeFileSync(
      `${__dirname}/${this.projectUUID}.json`,
      JSON.stringify(
        {
          RahatToken: {
            address: TokenContract.contract.target,
            startBlock: TokenContract.blockNumber,
          },
          C2CProject: {
            address: C2CProjectContract.contract.target,
            startBlock: C2CProjectContract.blockNumber,
          },
        },
        null,
        2
      )
    );
  }

  public async addContractSettings() {
    const contracts = await this.getDeployedContractDetails(
      this.projectUUID,
      contractName
    );
    // console.log('contracts', contracts);
    const data = {
      name: 'Contract',
      value: contracts,
      isPrivate: false,
    };

    await settings.create(data);
  }
}

async function main() {
  const seedProject = new SeedProject();
  // await seedProject.deployC2CContracts();
  await seedProject.addContractSettings();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
