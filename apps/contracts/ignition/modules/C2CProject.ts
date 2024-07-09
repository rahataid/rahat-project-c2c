import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
const { ethers } = require('hardhat');

const C2CModule = buildModule('C2CModule', (m) => {
  const c2cProject = m.contract('C2CProject', ['rahat-c2c']);
  console.log('Deploying C2CProject');
  return { c2cProject };
});

export default C2CModule;
