import { Prisma, PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import * as fs from 'fs/promises';

const prisma = new PrismaClient({
  datasourceUrl: process.env.CORE_DATABASE_URL as string,
});

const rootPath = process.argv[2];
const rootEnv = `${rootPath}/.env`;

const main = async () => {
  const uuid = randomUUID();

  await prisma.$executeRaw(
    Prisma.sql`
        INSERT INTO tbl_projects (uuid, name, description, status, type)
        VALUES (${uuid}::uuid, 'C2C', 'C2C Project', 'ACTIVE', 'C2C')`
  );

  console.log(`Project C2C created Successfully with UUID: ${uuid}`);
  const [devSettings] = await prisma.$queryRaw<any[]>(
    Prisma.sql`SELECT * FROM tbl_settings WHERE name = 'development'`
  );

  const privateKey = devSettings.value.privateKey;

  await modifyEnv(uuid, privateKey);
};

const modifyEnv = async (uuid: string, privateKey: string) => {
  try {
    let data = await fs.readFile(rootEnv, 'utf8');
    const lines = data.split('\n') as string[];

    const newLines = lines.map((line) => {
      if (line.startsWith('PROJECT_ID')) {
        return `PROJECT_ID=${uuid}`;
      }
      if (line.startsWith('RAHAT_ADMIN_PRIVATE_KEY')) {
        return `RAHAT_ADMIN_PRIVATE_KEY=${privateKey}`;
      }
      if (line.startsWith('DEPLOYER_PRIVATE_KEY')) {
        return `DEPLOYER_PRIVATE_KEY=${privateKey}`;
      }
      return line;
    });

    const newData = newLines.join('\n');
    await fs.writeFile(rootEnv, newData, 'utf-8');

    console.log({ rootEnv });
    console.log('File Updated Successfully.');
  } catch (error) {
    console.error('Error Modifying .env file', error);
  }
};

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
