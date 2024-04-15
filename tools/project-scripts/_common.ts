import * as dotenv from 'dotenv';
import { Config } from './types/config';
import { Contract, ContractFactory, JsonRpcProvider, ethers } from 'ethers';
import {
  ContractArtifacts,
  ContractDetails,
  DeployedContractData,
} from './types/contract';
import type { Signer } from 'ethers';
import { readFileSync } from 'fs';

dotenv.config();

const privateKeys = {
  deployer: process.env.DEPLOYER_PRIVATE_KEY,
  admin: process.env.RAHAT_ADMIN_PRIVATE_KEY,
};

export class ContractLib {
  private networkSettings: Config['blockchain'];
  private provider: JsonRpcProvider;
  public deployedContracts: DeployedContractData;
  public deployerAddress: any;
  public adminAddress: any;

  constructor() {
    const network: string =
      process.env.NETWORK_PROVIDER || 'http://127.0.0.1:8888';
    this.networkSettings = {
      rpcUrl: network,
      chainName: process.env.CHAIN_NAME || 'matic',
      chainId: Number(process.env.CHAIN_ID) || 8888,
      blockExplorerUrls: [
        process.env.BLOCK_EXPLORER_URL ||
          'https://explorer-mumbai.maticvigil.com/',
      ],
    };

    console.log({ network });

    this.provider = new JsonRpcProvider(network);
    this.deployerAddress = privateKeys.deployer;
    this.adminAddress = privateKeys.admin;
    this.deployedContracts = {};
  }

  public getDeployedContracts(
    contractName: string
  ): DeployedContractData[string] | DeployedContractData {
    if (contractName) {
      const contract = this.deployedContracts[contractName];
      if (contract) {
        return contract;
      }
      throw new Error(`Contract ${contractName} not found`);
    }
    return this.deployedContracts[contractName];
  }

  public getNetworkSettings() {
    return this.networkSettings;
  }

  public getWalletFromPrivateKey(privateKey: string) {
    return new ethers.Wallet(privateKey, this.provider);
  }

  public async getContractArtifacts(
    contractName: string
  ): Promise<ContractArtifacts> {
    const contract = await import(`./contracts/${contractName}.json`);
    console.log('contract', contract);
    return contract;
  }

  public async getDeployedAddress(
    contractAddressFile: string,
    contractName: string
  ) {
    const fileData = readFileSync(
      `${__dirname}/${contractAddressFile}.json`,
      'utf8'
    );
    const data = JSON.parse(fileData);
    return data[contractName].address;
  }

  public async getDeployedContractDetails(
    contractAddressFile: string,
    contractName: string[]
  ) {
    const contractDetails: ContractDetails = {};
    await Promise.all(
      contractName.map(async (contract) => {
        const address = await this.getDeployedAddress(
          contractAddressFile,
          contract
        );
        const { abi } = await this.getContractArtifacts(contract);
        contractDetails[contract] = { address, abi };
      })
    );
    return contractDetails;
  }
  public async getInterface(contractName: string) {
    const { abi } = await this.getContractArtifacts(contractName);
    const interFace = new ethers.Interface(abi);
    return interFace;
  }

  public async getContracts(
    contractName: string,
    contractAddressFile: string,
    deployedContractName: string,
    signer?: Signer
  ) {
    const contractAddress = await this.getDeployedAddress(
      contractAddressFile,
      deployedContractName
    );

    const { abi } = await this.getContractArtifacts(contractName);
    const privateKey = this.adminAddress || '';

    const wallet = new ethers.Wallet(privateKey, this.provider);

    const contract = new Contract(contractAddress, abi, wallet);
    return contract;
  }

  public async generateMutiCallData(
    contractName: string,
    functionName: string,
    callData: any
  ) {
    const interFace = await this.getInterface(contractName);
    const encodedData: any[] = [];

    if (callData) {
      for (const data of callData) {
        encodedData.push(interFace.encodeFunctionData(functionName, data));
      }
    }
    return encodedData;
  }

  public delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
  }

  public async deployContract(contractName: string, args: any[]) {
    const signer = new ethers.Wallet(this.deployerAddress || '', this.provider);
    const { abi, bytecode } = await this.getContractArtifacts(contractName);
    const factory = new ContractFactory(abi, bytecode, signer);
    const contract = await factory.deploy(...args);
    const address = await contract.getAddress();
    await contract.waitForDeployment();
    this.delay(500);
    return {
      blockNumber: contract.deploymentTransaction()?.blockNumber ?? 1,
      contract: new ethers.Contract(address, abi, this.provider),
    };
  }

  public async callContractMethod(
    contractName: string,
    methodName: string,
    args: any[],
    deployedContractName: string,
    contractAddressFile: string,
    signer?: Signer
  ) {
    const contractAddress = await this.getDeployedAddress(
      contractAddressFile,
      deployedContractName
    );

    if (!contractAddress) {
      throw new Error(`Contract ${contractName} not deployed`);
    }

    const contractArtifacts = await this.getContractArtifacts(contractName);

    const contract = new ethers.Contract(
      contractAddress,
      contractArtifacts.abi,
      signer || this.provider
    );

    const method = contract[methodName];

    if (!method) {
      throw new Error(
        `Method ${methodName} not found in contract ${contractName}`
      );
    }

    const result = await method(...args);
    await this.delay(3000);
    return result;
  }
}
