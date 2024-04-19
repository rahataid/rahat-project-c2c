export const ProjectDetails = `
  query ProjectDetails($projectAddress: String!) {
    c2CprojectDetail(id: $projectAddress) {
      totalClaimsAssigned
      id
    }
  }
`;
