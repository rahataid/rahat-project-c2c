import { Prisma, PrismaClient } from '@prisma/client';
import { ContractLib } from './_common';
import { PrismaService } from '@rumsan/prisma';
import { SettingsService } from '@rumsan/extensions/settings';
import { readFileSync } from 'fs';
import { ContractDetails } from './types/contract';
const prismaClient = new PrismaClient({
  datasourceUrl: process.env.CORE_DATABASE_URL as string,
});

const prisma = new PrismaService();
const settings = new SettingsService(prisma);
const subGraphURL = process.env.SUBGRAPH_URL;
const SETTINGS_DB_NAME = 'C2C_DEV';

class SettingsSeed extends ContractLib {
  private projectUUID: string;
  constructor() {
    super();
    this.projectUUID = process.env.PROJECT_UUID as string;
  }

  async getDevSettings() {
    const [devSettings] = await prismaClient.$queryRaw<any[]>(
      Prisma.sql([
        `SELECT *  FROM tbl_settings WHERE name='${SETTINGS_DB_NAME}'`,
      ])
    );
    return devSettings;
  }

  public async addAppSettings() {
    await settings.create({
      name: 'Blockchain',
      value: {
        chainId: process.env.CHAIN_ID,
        rpcUrl: process.env.NETWORK_PROVIDER,
        chainName: process.env.CHAIN_NAME,
        networkId: process.env.NETWORK_ID,
        nativeCurrency: {
          name: process.env.CURRENCY_NAME,
          symbol: process.env.CURRENCY_SYMBOL,
        },
      },
      isPrivate: false,
    });
  }

  public async addAdminAddress(adminAddress: string) {
    await settings.create({
      name: 'Admin',
      value: {
        address: adminAddress,
      },
      isPrivate: false,
    });
  }

  public async addGraphSettings() {
    console.log({ subGraphURL });
    await settings.create({
      name: 'Subgraph_URL',
      value: {
        url: subGraphURL,
      },
      isPrivate: false,
    });
  }

  public async addSafeWalletSettings() {
    await settings.create({
      name: 'SAFE_WALLET',
      value: {
        address: process.env.SAFE_WALLET,
      },
      isPrivate: false,
    });
  }

  public async getDeployedAddress(contractName: string) {
    const fileData = readFileSync(`${__dirname}/production.json`, 'utf8');
    const data = JSON.parse(fileData);
    return data[contractName].address;
  }

  public async addContractSettings(contractName: string[]) {
    const contractDetails: ContractDetails = {};

    await Promise.all(
      contractName.map(async (contract) => {
        const address = await this.getDeployedAddress(contract);
        const { abi } = await this.getContractArtifacts(contract);
        console.log({ abi });
        contractDetails[contract] = { address, abi };
      })
    );
    const data = {
      name: 'Contract',
      value: contractDetails,
      isPrivate: false,
    };
    await settings.create(data);
  }
}

async function main() {
  const seedProject = new SettingsSeed();
  console.log({ seedProject });
  const devSettings = await seedProject.getDevSettings();
  console.log({ devSettings });
  const adminAccounts = await devSettings.value.adminAccounts;
  console.log({ adminAccounts });

  await seedProject.addContractSettings(['RahatToken', 'C2CProject']);
  console.log(`first`);
  await seedProject.addAppSettings();
  await seedProject.addAdminAddress(adminAccounts[0]);
  await seedProject.addGraphSettings();
  await seedProject.addSafeWalletSettings();

  process.exit(0);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
