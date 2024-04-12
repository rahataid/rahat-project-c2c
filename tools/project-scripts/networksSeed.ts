import * as fs from 'fs/promises';
import * as dotenv from 'dotenv';

dotenv.config();

const getProjectID = async (envPath: string) => {
  try {
    const data = await fs.readFile(envPath, 'utf8');
    const lines = data.split('\n') as string[];

    for (const line of lines) {
      if (line.startsWith('PROJECT_ID')) {
        const value = line.split('=');
        return value[1];
      }
    }
  } catch (error) {
    console.error('Error reading .env file.', error);
  }
};

const modifyNetworksFile = async (
  contractAddressesPath: string,
  networksFilePath: string
) => {
  try {
    const contractData = await fs.readFile(contractAddressesPath, 'utf8');
    const newAddresses = JSON.parse(contractData);

    const networksData = await fs.readFile(networksFilePath, 'utf8');
    const networks = JSON.parse(networksData);

    const newNetworksData = {
      ...networks,
      mainnet: newAddresses,
    };

    const stringified = JSON.stringify(newNetworksData, null, 2);
    await fs.writeFile(networksFilePath, stringified, 'utf-8');

    console.log(`Modified networks.json.`);
  } catch (error) {
    console.error(
      `Error processing JSON file: ${contractAddressesPath}`,
      error
    );
  }
};

(async function () {
  const rootPath = process.argv[2];
  const projectID = process.env.PROJECT_ID;
  const contractAddressesPath = `${rootPath}/tools/project-scripts/${projectID}.json`;
  const networksFilePath = `${rootPath}/apps/graph/networks.json`;
  modifyNetworksFile(contractAddressesPath, networksFilePath);
})();
