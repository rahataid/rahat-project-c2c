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

  async getELDevSettings() {
    const [devSettings] = await prismaClient.$queryRaw<any[]>(
      Prisma.sql([`SELECT *  FROM tbl_settings WHERE name='EL_DEV'`])
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
        networkId: process.env.CHAIN_ID,
        nativeCurrency: {
          name: process.env.CURRENCY_NAME,
          symbol: process.env.CURRENCY_SYMBOL,
        },
      },
      isPrivate: false,
    });
  }

  // public async addAdminAddress(adminAcc: string) {
  //   await settings.create({
  //     name: 'Admin',
  //     value: {
  //       address: adminAcc,
  //     },
  //     isPrivate: false,
  //   });
  // }

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

  // public async addAdminToEl(addresses: any) {
  //   const deployerAccount = this.getWalletFromPrivateKey(this.deployerAddress);
  //   await this.callContractMethod(
  //     'AccessManager',
  //     'updateAdmin',
  //     [addresses, true],
  //     'AccessManager',
  //     this.projectUUID,
  //     deployerAccount
  //   );
  //   await this.delay(2000);
  //   console.log(`Added Admins ${addresses} to AccessManager`);
  // }

  //   public async addDonor(addresses: any) {
  //     const deployerAccount = this.getWalletFromPrivateKey(this.deployerAddress);
  //     await this.callContractMethod(
  //       'AccessManager',
  //       'updateDonor',
  //       [addresses, true],
  //       'AccessManager',
  //       this.projectUUID,
  //       deployerAccount
  //     );
  //     await this.delay(2000);
  //     console.log(`Added Donor ${addresses} to  Project`);
  //   }
}
async function main() {
  const seedProject = new SettingsSeed();
  // const devSettings = await seedProject.getELDevSettings()
  // const adminAccounts = devSettings.value!.adminAccounts
  // const adminAccounts = [
  //   '0xAC6bFaf10e89202c293dD795eCe180BBf1430d7B',
  //   '0xf0c84735Af5669c809EfD62C9D4e466d331A95b0',
  //   '0xcDEe632FB1Ba1B3156b36cc0bDabBfd821305e06',
  //   '0x033CC5Ea971bed3e08a773b3424A00b407193518',
  // ];

  await seedProject.addAppSettings();
  // await seedProject.addAdminAddress(adminAccounts[0]);
  await seedProject.addGraphSettings();

  // await seedProject.addAdminToEl(adminAccounts[0]);
  // await seedProject.addDonor(adminAccounts[0])

  process.exit(0);
}
main();
