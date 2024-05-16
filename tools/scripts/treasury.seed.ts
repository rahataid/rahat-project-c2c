import { Prisma, PrismaClient, Setting, SettingDataType } from '@prisma/client';

const prisma = new PrismaClient();

// contractAddress
// :
// "0xa4Ea974c39a6CFBa389FB5583889f189183472E8"
// multiSigWalletAddress
// :
// "0xAC6bFaf10e89202c293dD795eCe180BBf1430d7B"
// network
// :
// ""
// treasurySources
// :
// (3) ['project_balance', 'user_wallet', 'beneficiary_wallet']
const main = async () => {
  const treasurySettings: Prisma.SettingCreateInput = {
    name: 'TREASURY_SOURCES',
    dataType: SettingDataType.OBJECT,
    isPrivate: false,
    isReadOnly: false,
    requiredFields: ['multiSigWalletAddress', 'network', 'treasurySources'],
    value: {
      multiSigWalletAddress: '0xAC6bFaf10e89202c293dD795eCe180BBf1430d7B',
      network: '8888',
      treasurySources: ['project_balance', 'user_wallet', 'beneficiary_wallet'],
    },
  };

  const setting = await prisma.setting.create({ data: treasurySettings });

  console.log('Treasury Settings Created Successfully:', setting);
};

main()
  .catch((error) => {
    console.error('Error Creating Treasury Settings:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
