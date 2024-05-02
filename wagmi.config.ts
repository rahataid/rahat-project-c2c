import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import { C2CProject } from './abis/C2CProject';
import { RahatDonor } from './abis/RahatDonor';
import { RahatToken } from './abis/RahatToken';
import { RahatCommunity } from './abis/RahatCommunity';

export default defineConfig([
  {
    out: 'libs/react-query/src/contracts/generated-hooks/c2c.ts',
    contracts: [
      {
        name: 'C2CProject',
        abi: C2CProject,
      },
    ],
    plugins: [react()],
  },
  {
    out: 'libs/react-query/src/contracts/generated-hooks/donor.ts',
    contracts: [
      {
        name: 'RahatDonor',
        abi: RahatDonor,
      },
    ],
    plugins: [react()],
  },
  {
    out: 'libs/react-query/src/contracts/generated-hooks/token.ts',
    contracts: [
      {
        name: 'RahatToken',
        abi: RahatToken,
      },
    ],
    plugins: [react()],
  },
  {
    out: 'libs/react-query/src/contracts/generated-hooks/community.ts',
    contracts: [
      {
        name: 'RahatCommunity',
        abi: RahatCommunity,
      },
    ],
    plugins: [react()],
  },
]);
