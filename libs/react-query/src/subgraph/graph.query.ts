export const ProjectDetails = `
  query ProjectDetails($projectAddress: String!) {
    tokenBalance(id: $projectAddress) {
        balance
        id
    }
  }
`;
