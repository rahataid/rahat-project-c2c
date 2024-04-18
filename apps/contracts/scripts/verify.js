const { ethers, run, upgrades } = require('hardhat');
const { writeFileSync, readFileSync } = require('fs');

const contractAddress = [
  '0x90E92459421a3Ac7B5565Dd2173C41716AA830fE',
  '0xc4D06bf1147Fa863292B618C4F427cCe3183017b',
  '0x5a8b667Ea5D90016aD65DBEE79Ea102d3133DDaB',
  '0x1A767197679f389de6a654bA903DD83A38b9977a',
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
