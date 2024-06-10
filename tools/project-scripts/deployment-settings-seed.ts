import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '@rumsan/prisma';
import { SettingsService } from '@rumsan/settings';
import * as dotenv from 'dotenv';
import { ContractLib } from './_common';
dotenv.config();

const prismaClient = new PrismaClient({
  datasourceUrl: process.env.CORE_DATABASE_URL as string,
});

const prisma = new PrismaService();
const settings = new SettingsService(prisma);
const subGraphURL = process.argv[2];

class SettingsSeed extends ContractLib {
  projectUUID: string;

  constructor() {
    super();
    this.projectUUID = process.env.PROJECT_ID as string;
  }

  public async addAppSettings() {
    await settings.create({
      name: 'Blockchain',
      value: {
        chainId: process.env.CHAIN_ID,
        rpcUrl: process.env.NETWORK_PROVIDER,
        chainName: process.env.CHAIN_NAME,
        networkId: process.env.CHAIN_ID,
        nativeCurrency: {
          name: process.env.CURRENCY_NAME,
          symbol: process.env.CURRENCY_SYMBOL,
        },
      },
      isPrivate: false,
    });
  }

  public async addGraphSettings() {
    // const formatted = subGraphURL.substring(0, subGraphURL.indexOf('\\') !== -1 ? subGraphURL.indexOf('\\') : undefined);
    // const formattedURL = formatted ? formatted : 'http://localhost:8000/subgraphs/name/rahat/el'
    const formattedURL = process.env.SUBGRAPH_URL;
    await settings.create({
      name: 'SUBGRAPH_URL',
      value: {
        url: formattedURL,
      },
      isPrivate: false,
    });
  }
}
async function main() {
  const seedProject = new SettingsSeed();

  await seedProject.addAppSettings();
  await seedProject.addGraphSettings();

  process.exit(0);
}
main();
