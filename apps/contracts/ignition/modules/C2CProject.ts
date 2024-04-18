import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
const { ethers } = require('hardhat');

const C2CModule = buildModule('C2CModule', (m) => {
  const communityName = 'Rumsan Community';
  const [admin] = ethers.getSigners();
  const rahatCommunity = ethers.deployContract('RahatCommunity', [
    communityName,
    admin.address,
  ]);

  const rahatCommunityAddress = rahatCommunity.getAddress();

  const c2cProject = m.contract('C2CProject', [
    communityName,
    rahatCommunityAddress,
  ]);

  return { c2cProject };
});

export default C2CModule;
