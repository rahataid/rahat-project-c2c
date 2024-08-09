import { Prisma, PrismaClient } from '@prisma/client';
import { ContractLib } from './_common';
import { PrismaService } from '@rumsan/prisma';
import { SettingsService } from '@rumsan/extensions/settings';
import { error } from 'console';

const prismaClient = new PrismaClient({
  datasourceUrl: process.env.CORE_DATABASE_URL as string,
});

const prisma = new PrismaService();
const settings = new SettingsService(prisma);
const subGraphURL = process.argv[2];
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
    const formatted = subGraphURL.substring(
      0,
      subGraphURL.indexOf('\\') !== -1 ? subGraphURL.indexOf('\\') : undefined
    );
    const formattedUrl = formatted
      ? formatted
      : 'http://localhost:8000/subgraphs/name/rahat/c2c';
    await settings.create({
      name: 'Subgraph_URL',
      value: {
        url: formattedUrl,
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
}

async function main() {
  const seedProject = new SettingsSeed();
  const devSettings = await seedProject.getDevSettings();
  const adminAccounts = await devSettings.value.adminAccounts;

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
