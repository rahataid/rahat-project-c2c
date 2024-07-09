### Data Caching Service Manual

### 1. Introduction

This document provides comprehensive information for system administrators and users on how to use the caching service to effectively access and manage blockchain data.

### 2. Overview of the Caching Service

The caching service in Rahat leverages TheGraph to index and cache essential blockchain data. This allows for efficient data retrieval and ensures that key information is readily available for decision-making and reporting.

### 3. How the Caching Service Works

#### System Architecture
The caching service uses a subgraph created with TheGraph. The subgraph indexes blockchain events related to beneficiary registrations, fund disbursements, and project activities.

#### Data Flow
1. **Event Emission**: Smart contracts emit events on the blockchain.
2. **Data Indexing**: TheGraph indexes these events and stores them in a subgraph.
3. **Data Retrieval**: Users and administrators query the subgraph to retrieve cached data.

### 4. Using the Cached Blockchain Data

#### Accessing the Data
Data can be accessed via GraphQL queries to the subgraph. Administrators and users can use these queries to fetch specific data points as needed.

#### Query Examples

1. **Fetching Beneficiaries**
```graphql
query {
  beneficiaries {
    id
    walletAddress
    amount
  }
}
```

2. **Fetching Disbursements**
```graphql
query {
  disbursements {
    id
    beneficiary {
      wallet
    }
    amount
    tokenAddress
    disbursementDate
  }
}
```

3. **Fetching Projects**
```graphql
query {
  projects {
    id
    totalFunds
    fundsDisbursed
  }
}
```

### 5. Administrator Guide

#### Setting Up and Managing the Caching Service

To Setup the Caching Service we need to follow the below steps:
- Install The Graph CLI (with either yarn or npm)
- Create your Subgraph in Subgraph Studio
- Authenticate your account from the CLI
- Deploying a Subgraph to Subgraph Studio

Detailed deployment ssteps can be found [here](https://thegraph.com/docs/en/deploying/deploying-a-subgraph-to-studio/)

