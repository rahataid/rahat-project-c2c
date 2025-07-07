import { Injectable } from '@nestjs/common';
import SafeApiKit from '@safe-global/api-kit';
import Safe from '@safe-global/protocol-kit';
import {
  MetaTransactionData,
  OperationType,
} from '@safe-global/safe-core-sdk-types';
import { PrismaService } from '@rumsan/prisma';
import { ethers, JsonRpcApiProvider, JsonRpcProvider } from 'ethers';
import { erc20Abi } from '../utils/constant';
import { getWalletFromPrivateKey } from '../utils/web3';
import { get } from 'http';
import { CreateSafeTransactionDto } from '@rahataid/c2c-extensions/dtos';

@Injectable()
export class DisbursementMultisigService {
  private safeApiKit: SafeApiKit;
  constructor(protected prisma: PrismaService) {
    this.safeApiKit = new SafeApiKit({
      chainId: BigInt(process.env.CHAIN_ID),
    });
  }

  async generateTransactionData(amount: string) {
    const CONTRACT = await this.prisma.setting.findUnique({
      where: {
        name: 'CONTRACT',
      },
    });
    const c2cAddress = CONTRACT.value['C2CPROJECT']['ADDRESS'];
    const tokenAddress = CONTRACT.value['RAHATTOKEN']['ADDRESS'];

    const tokenContract = new ethers.Contract(
      tokenAddress,
      erc20Abi,
      new JsonRpcProvider(process.env.NETWORK_PROVIDER)
    );
    // getWalletFromPrivateKey(process.env.DEPLOYER_PRIVATE_KEY));
    const decimals = await tokenContract.decimals();
    const tokenApprovalEncodedData = tokenContract.interface.encodeFunctionData(
      'approve',
      [c2cAddress, ethers.parseUnits(amount, decimals)]
    );
    // Create transaction
    const safeTransactionData: MetaTransactionData = {
      to: tokenAddress,
      value: '0', // in wei
      data: tokenApprovalEncodedData,
      operation: OperationType.Call,
    };

    return safeTransactionData;
  }

  async getSafeInstance() {
    //CONSTANTS for BASE SEPOLIA
    //TODO: getit from settings
    const SAFE_ADDRESS = await this.prisma.setting.findFirst({
      where: {
        name: 'SAFE_WALLET',
      },
    });
    const safeKit = await Safe.init({
      provider: process.env.NETWORK_PROVIDER,
      signer: process.env.DEPLOYER_PRIVATE_KEY,
      safeAddress: ethers.getAddress(SAFE_ADDRESS.value['ADDRESS']),
    });
    return safeKit;
  }

  async getOwnersList() {
    const SAFE_ADDRESS = await this.prisma.setting.findFirst({
      where: {
        name: 'SAFE_WALLET',
      },
    });
    const { owners } = await this.safeApiKit.getSafeInfo(
      ethers.getAddress(SAFE_ADDRESS.value['ADDRESS'])
    );
    return owners;
  }

  async getSafeTransaction(safeTxHash: string) {
    const safeTransaction = await this.safeApiKit.getTransaction(safeTxHash);
    return safeTransaction;
  }

  async createSafeTransaction(payload: CreateSafeTransactionDto) {
    try {
      console.log('creatin tx');
      const transactionData = await this.generateTransactionData(
        payload.amount
      );
      const safeWallet = await this.getSafeInstance();

      const safeTransaction = await safeWallet.createTransaction({
        transactions: [transactionData],
      });
      const safeTxHash = await safeWallet.getTransactionHash(safeTransaction);
      const signature = await safeWallet.signHash(safeTxHash);
      const deployerWallet = getWalletFromPrivateKey(
        process.env.DEPLOYER_PRIVATE_KEY
      );
      const safeAddress = await safeWallet.getAddress();

      // Propose transaction to the service

      await this.safeApiKit.proposeTransaction({
        safeAddress: safeAddress,
        safeTransactionData: safeTransaction.data,
        safeTxHash,
        senderAddress: deployerWallet.address,
        senderSignature: signature.data,
      });

      // console.log({
      //   safeAddress,
      //   safeTransactionData: safeTransaction.data,
      //   safeTxHash,
      //   senderAddress: deployerWallet.address,
      //   senderSignature: signature.data,
      // });

      return {
        safeAddress: safeAddress,
        safeTransactionData: safeTransaction.data,
        safeTxHash,
        senderAddress: deployerWallet.address,
        senderSignature: signature.data,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getTransactionApprovals(safeTxHash: string) {
    const owners = await this.getOwnersList();
    const { confirmations, confirmationsRequired, isExecuted, proposer } =
      await this.getSafeTransaction(safeTxHash);
    console.log({ owners });
    const approvals = owners.map((owner) => {
      const confirmation = confirmations?.find(
        (confirmation) => confirmation.owner === owner
      );
      return {
        owner,
        submissionDate: confirmation?.submissionDate || null,
        hasApproved: confirmation ? true : false,
        ...confirmation,
      };
    });
    console.log('approvals', approvals);
    return { approvals, confirmationsRequired, isExecuted, proposer };
  }

  async getSafePendingTransactions() {
    const SAFE_ADDRESS = await this.prisma.setting.findFirst({
      where: {
        name: 'SAFE_WALLET',
      },
    });
    const pendingTransaction = await this.safeApiKit.getPendingTransactions(
      ethers.getAddress(SAFE_ADDRESS.value['ADDRESS'])
    );

    return pendingTransaction;
  }
}
