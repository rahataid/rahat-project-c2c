import { Address } from '@graphprotocol/graph-ts';
import { C2CProjectDetail } from '../generated/schema';
import { C2CProject } from '../generated/C2CProject/C2CProject';

export function getProjectDetails(address: Address): C2CProjectDetail | null {
  let project = C2CProjectDetail.load(address);
  let contract = C2CProject.bind(address);

  let totalClaimsAssigned = contract.try_totalClaimsAssigned();
  let claims = contract.try_beneficiaryClaims(address);
  let tokenBudget = contract.try_tokenBudget(address);

  if (!project) {
    project = new C2CProjectDetail(address);
    project.totalClaimsAssigned = totalClaimsAssigned.value;
    project.totalBeneficiaryClaims = claims.value;
    project.tokenBudget = tokenBudget.value;
    project.save();
  }

  if (project) {
    project.totalClaimsAssigned = totalClaimsAssigned.value;
    project.totalBeneficiaryClaims = claims.value;
    project.tokenBudget = tokenBudget.value;
    project.save();
  }

  return project;
}
