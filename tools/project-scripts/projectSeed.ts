import { SettingsService } from '@rumsan/extensions/settings';
import { PrismaService } from '@rumsan/prisma';
import { randomBytes } from 'crypto';
import * as dotenv from 'dotenv';
import { uuidV4 } from 'ethers';
import { writeFileSync } from 'fs';
import { ContractLib } from './_common';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
dotenv.config();

const prismaClient = new PrismaClient({
  datasourceUrl: process.env.CORE_DATABASE_URL as string,
});

const SETTINGS_DB_NAME = 'C2C_DEV';

const api = axios.create({
  baseURL: (process.env.RAHAT_CORE_API_URL as string) + '/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.RAHAT_CORE_API_KEY}`,
  },
});

const prisma = new PrismaService();
const settings = new SettingsService(prisma);

const contractName = ['C2CProject'];

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
  public async fetchContractSettings() {
    const url = `/settings/CONTRACTS`;
    const { data } = await api.get(url);
    const contracts = data?.data?.value;
    const RahatAccessManagerAddress =
      contracts.RAHATACCESSMANAGER.address ||
      contracts.RAHATACCESSMANAGER.ADDRESS;
    const RahatTreasuryAddress =
      contracts.RAHATTREASURY.address || contracts.RAHATTREASURY.ADDRESS;
    // const forwarderAddress =
    //   contracts.ERC2771FORWARDER.address || contracts.ERC2771FORWARDER.ADDRESS;

    return {
      RahatAccessManagerAddress,
      RahatTreasuryAddress,
      // forwarderAddress,
    };
  }

  public async deployC2CContracts() {
    const deployerAccount = this.getWalletFromPrivateKey(this.deployerKey);
    console.log('Deployer Account:', deployerAccount.address);
    const rahatTokenDetails = await this.fetchContractSettings();
    console.log('Rahat Token Details:', rahatTokenDetails);

    // console.log('----------Deploying Rahat Token-------------------');
    // const TokenContract = await this.deployContract('RahatToken', [
    //   rahatTokenDetails.name,
    //   rahatTokenDetails.symbol,
    //   deployerAccount.address,
    //   rahatTokenDetails.decimals,
    // ]);
    // console.log({
    //   TokenContract: TokenContract.contract.target,
    //   blockNumber: TokenContract.blockNumber,
    // });

    console.log('----------Deploying C2C Project Contract-------------------');
    const C2CProjectContract = await this.deployContract('C2CProject', [
      // todo: make this dynamic: name, manager, forwarder
      'C2C Project',
      rahatTokenDetails.RahatAccessManagerAddress,
      rahatTokenDetails.RahatAccessManagerAddress, // Rahat Treasury Address
      // '0x70A6797002BF40BE37A5835dcE2Efa21F7917632',
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
          // RahatToken: {
          //   address: TokenContract.contract.target,
          //   startBlock: TokenContract.blockNumber,
          // },
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
  await seedProject.deployC2CContracts();
  await seedProject.addContractSettings();

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
