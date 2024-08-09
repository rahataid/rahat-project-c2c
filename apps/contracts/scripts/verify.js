const { ethers, run, upgrades } = require('hardhat');
const { writeFileSync, readFileSync } = require('fs');

const contractAddress = [
  '0x7BD21577455b2287598dAA64E044EB3F276A0B03',
  '0xd1E6617B7BB6895b1AA3cD719d8b8aC9FE238EB5',
  '0xD70aC0001aE30793b6c0C49D13f14F01ef54423d',
  '0x900C1Eb2831593d39597e0696FD2ae95A28A756F',
];

const contractName = [
  'RahatDonor',
  'RahatToken',
  'RahatCommunity',
  'C2CProject',
];

const rahatTokenDetails = {
  name: 'Rumsan Coin',
  symbol: 'RUM',
  decimals: 18,
};

const communityName = 'Rumsan Community';

const verify = async (contractAddress, args) => {
  console.log('Verifying contract...');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!');
    } else {
      console.log(e);
    }
  }
};

(async function () {
  await verify(contractAddress[0], [
    `0x17469fF5Bdc86a5FCeb4604534fF2a47a821d421`,
  ]);

  await verify(contractAddress[1], [
    rahatTokenDetails.name,
    rahatTokenDetails.symbol,
    contractAddress[0],
    rahatTokenDetails.decimals,
  ]);

  await verify(contractAddress[2], [
    communityName,
    `0x17469fF5Bdc86a5FCeb4604534fF2a47a821d421`,
  ]);

  await verify(contractAddress[3], ['C2C Project', contractAddress[2]]);
})();
