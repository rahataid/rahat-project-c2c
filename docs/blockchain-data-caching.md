### Document: Data Schema and Indexing Requirements for Blockchain Data Caching using TheGraph

#### 1. Introduction
**Overview of Rahat**:  
Rahat is a blockchain-based aid distribution platform designed to register beneficiaries and disburse crypto tokens/stable coins to them. The platform ensures secure, transparent, and efficient distribution of funds to those in need.

**Objective**:  
This document defines the data schema and indexing requirements for caching essential blockchain data using TheGraph. This will facilitate efficient data retrieval and ensure that critical information is readily accessible.

#### 2. Requirements and Prerequisites
- **Technologies**: 
  - TheGraph
  - GraphQL
  - EVM based Blockchain network (e.g., Ethereum)
- **Environment**: Development and production environments setup for TheGraph and blockchain interactions.

#### 3. Data Schema Design
**Entities and Relationships**: The data schema consists of the following key entities, each representing a crucial component of the Rahat platform:

1. **Beneficiary**
   - **Wallet Address**: The blockchain wallet address associated with the beneficiary.
   - **Amount**: The amount of token allocated to beneficiary.

2. **Disbursement**
   - **Beneficiary**: The beneficiary who received the disbursement.
   - **Amount**: The amount of tokens/coins disbursed.
   - **Token Address**: The address of the token contract used for disbursement.
   - **Disbursement Date**: The timestamp when the disbursement was made.

3. **Project**
   - **ID**: Unique identifier for each project.
   - **Total Funds**: The total amount of funds allocated to the project.
   - **Funds Disbursed**: The amount of funds that have been disbursed.
   - **Beneficiaries**: List of beneficiaries associated with the project.

#### 4. Indexing Requirements
To efficiently cache and index the essential blockchain data, the following requirements must be met:

1. **Beneficiary Token Allocation Events**: 
   - Index all events related to the token allocations to beneficiaries.
   - Cache the beneficiary's wallet address, amount and allocation date.

2. **Funds Disbursement Events**: 
   - Index all disbursement events to track the flow of funds.
   - Cache the disbursement ID, beneficiary wallet, amount, token address, and disbursement date.

3. **Project Creation and Updates**: 
   - Cache the project ID, total funds, funds disbursed, associated beneficiaries, and disbursements.

#### 5. Data Caching Strategy
The data caching strategy involves using TheGraph to create a subgraph that indexes the aforementioned entities and events. This subgraph will enable efficient querying of the blockchain data to provide real-time insights and historical data.

#### 6. Deployment and Testing
**Deployment**:
- Deploy the subgraph to TheGraph's decentralized network.
- Ensure all required entities and event handlers are correctly configured in the subgraph manifest.

**Testing**:
- Verify that the subgraph indexes the data correctly.
- Test queries to ensure they return accurate and complete data.
- Perform load testing to ensure the subgraph can handle high volumes of data and queries.

#### 7. Conclusion
This document outlines the data schema and indexing requirements for caching essential blockchain data for the Rahat project using TheGraph. By defining clear entities, relationships, and indexing strategies, we ensure efficient data retrieval and improved performance for the Rahat platform.

#### 8. References
- [TheGraph Documentation](https://thegraph.com/docs/)
- [GraphQL Documentation](https://graphql.org/learn/)
- [Ethereum Documentation](https://ethereum.org/en/developers/docs/)

