export const ProjectDetails = `
  query ProjectDetails {
    tokenBalances {
      id,
      balance
    }
  }
`;

export const TransactionHistory = `
  query MyQuery {
      tokenReceiveds {
      amount
      blockTimestamp
      blockNumber
      from
      id
      token
      transactionHash
    }
    
    transferProcesseds {
      blockTimestamp
      blockNumber
      id
      transactionHash
      _tokenAddress
      _beneficiary
      _amount
    }
  }  
`;
