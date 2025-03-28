# Rahat Project C2C

This guide outlines the steps for manually deploying the C2C project.

## Contract Deployment
The C2C project requires deploying two contracts: **Rahat Token** and **C2C Project**.

## Prerequisites
Ensure the `.env` file is configured with the following values:

- `DEPLOYER_PRIVATE_KEY=`
- `NETWORK_PROVIDER=`

## Deployment Resources

- Updated ABI files for contract deployment are available in the [contracts](../tools/project-scripts/contracts) directory.  
- The deployment script can be found [here](../tools/project-scripts/projectSeed.ts). This script deploys the contracts and records their addresses in the [deployment](../tools/project-scripts/) file. The deployed contracts are also added to the settings.

## Deploying the Subgraph Studio  
### Creating a Subgraph
The project uses a subgraph as an indexer. Follow these steps to deploy it:  

1. Create an account in [Graph Studio](https://thegraph.com/studio/).  
2. After creating the account, generate a subgraph slug.  
3. Run the following commands to generate and build the graph:

```bash
pnpm graph:codegen
pnpm graph:build
```
### Authenticate
 - Authenticate with The Graph Studio using:
     ```bash
     graph auth --studio <deployment_key>
     ```
### Deployment
   - Use the deployment script defined in `package.json` to deploy the subgraph for the specified network.
   - Sample to update the script in package.json.

   ```bash
   "graph:studio:deploy-name": cd ./apps/graph && graph deploy --studio --network network_name subgraph_slug
   ```

   - Example to create the script to deploy the subgraph in `base-sepolia` for subgraph-slug `kenya-stage`

   ```bash
   "graph:studio:deploy-base-sepolia-stage": cd ./apps/graph && graph deploy --studio --network base-sepolia kenya-stage
   ```

   - Now run the script to deploy the graph for new contracts.
   - Need to provide the version value for subgraph deployment. `version value = one version greater than latest version`

    


## Adding Network Settings
The script for configuring network settings is located [here](../tools/project-scripts/productionSeed.ts). This script updates the blockchain settings.
Ensure these values are correctly assigned when adding blockchain and subgraph settings and safe wallet.
Ensure these values are correctly assigned when adding blockchain settings:

`CHAIN_ID` =
`NETWORK_PROVIDER` = 
`CHAIN_NAME` =
`NETWORK_ID` =
`CURRENCY_NAME`=
`CURRENCY_SYMBOL` =
`SAFE_WALLET`=
`SUBGRAPH_URL`=




