import { Address } from '@graphprotocol/graph-ts';
// import { C2CProjectDetail } from '../generated/schema';
// import { C2CProject } from '../generated/C2CProject/C2CProject';

// export function getProjectDetails(address: Address): C2CProjectDetail | null {
//   let project = C2CProjectDetail.load(address);
//   let contract = C2CProject.bind(address);

//   let totalClaimsAssigned = contract.try_totalClaimsAssigned();
//   let claims = contract.try_beneficiaryClaims(address);
//   let tokenBudget = contract.try_tokenBudget(address);

//   if (!project) {
//     project = new C2CProjectDetail(address);
//     project.totalClaimsAssigned = totalClaimsAssigned.value;
//     project.totalBeneficiaryClaims = claims.value;
//     project.tokenBudget = tokenBudget.value;
//     project.save();
//   }

//   if (project) {
//     project.totalClaimsAssigned = totalClaimsAssigned.value;
//     project.totalBeneficiaryClaims = claims.value;
//     project.tokenBudget = tokenBudget.value;
//     project.save();
//   }

//   return project;
// }

import { TokenBalance } from '../generated/schema';
import { RahatToken } from '../generated/RahatToken/RahatToken';
import { TokenDetail } from '../generated/schema';

export function getTokenBalance(
  address: Address,
  projectAddress: Address
): TokenBalance | null {
  let projectBalance = TokenBalance.load(projectAddress);
  let contract = RahatToken.bind(address);

  let balance = contract.try_balanceOf(projectAddress);

  if (!projectBalance) {
    projectBalance = new TokenBalance(address);
    projectBalance.balance = balance.value;
    projectBalance.save();
  }

  if (projectBalance) {
    projectBalance.balance = balance.value;
    projectBalance.save();
  }

  return projectBalance;
}

export function getTokenDetail(address: Address): TokenDetail | null {
  let projectDetail = TokenDetail.load(address);
  let contract = RahatToken.bind(address);

  let name = contract._name;

  if (!projectDetail) {
    projectDetail = new TokenDetail(address);
    projectDetail.name = name;
    projectDetail.save();
  }
  if (projectDetail) {
    projectDetail.name = name;
    projectDetail.save();
  }
  return projectDetail;
}
