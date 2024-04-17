import { Address } from '@graphprotocol/graph-ts';
import { C2CProjectDetail } from '../generated/schema';
import { C2CProject } from '../generated/C2CProject/C2CProject';

export function getProjectDetails(address: Address): C2CProjectDetail | null {
  let project = C2CProjectDetail.load(address);
  let contract = C2CProject.bind(address);

  let beneficiaryDetail = contract.try_totalClaimsAssigned();

  if (!project) {
    project = new C2CProjectDetail(address);
    project.totalClaimsAssigned = beneficiaryDetail.value;
    project.save();
  }

  if (project) {
    project.totalClaimsAssigned = beneficiaryDetail.value;
    project.save();
  }

  return project;
}
