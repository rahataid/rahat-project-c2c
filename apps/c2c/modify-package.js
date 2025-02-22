const fs = require('fs');
// Load the existing package.json
const appName = 'c2c';

const packagePath = `dist/apps/${appName}/package.json`;

try {
  // Read the package.json file as a JSON object
  const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  // Modify package.json as needed
  packageData.scripts = {
    ...packageData.scripts,
    start: 'node main.js',
    [`studio:${appName}`]: 'prisma studio --schema prisma/schema.prisma',
    [`migrate:${appName}`]: `prisma migrate dev --name ${appName} --schema prisma/schema.prisma`,
    [`generate:${appName}`]: `prisma generate --schema prisma/schema.prisma`,
  };

  packageData.dependencies = {
    ...packageData.dependencies,
    prisma: '^5.1.0',
    'ts-node': '^10.9.1',
    '@prisma/client': '^5.1.0',
    'prisma-dbml-generator': '^0.12.0',
    'prisma-docs-generator': '^0.8.0',
    'prisma-json-schema-generator': '^5.1.1',
    dotenv: '^16.4.4',
    '@rumsan/extensions': '^0.0.21',
    'viem': "^2.10.2"
  };

  packageData.prisma = {
    seed: 'prisma/seed.ts',
  };

  // Write the updated package.json back to the file
  fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2), 'utf8');

  console.log('package.json updated successfully.');
} catch (err) {
  console.error('Error updating package.json:', err);
}
