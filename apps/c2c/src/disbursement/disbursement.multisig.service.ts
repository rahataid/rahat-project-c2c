import { Injectable } from "@nestjs/common";
import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import {
    MetaTransactionData,
    OperationType
} from '@safe-global/safe-core-sdk-types'
import { PrismaService } from '@rumsan/prisma';
import { ethers } from 'ethers'


@Injectable()
export class DisbursementMultisigService {
    constructor(
        protected prisma: PrismaService,

    ) { }

    async generateTransactionData() {
        const RPC_URL = 'https://sepolia.base.org'
        const { value: contracts } = await this.prisma.setting.findFirst({
            where: {
                name: 'CONTRACT'
            }
        })
        const { value: safeWallet } = await this.prisma.setting.findFirst({
            where: {
                name: 'SAFE_WALLET'
            }
        })

        console.log({ contracts, safeWallet })
        const tokenContract = new ethers.Contract(
            contracts?.C2CPROJECT?.ADDRESS,
            contracts?.C2CPROJECT?.ABI,
            new ethers.JsonRpcProvider(RPC_URL))
        console.log({ tokenContract })
    }


    async createSafeTransaction() {
        console.log("creatin tx")
        const CONTRACTS = await this.prisma.setting.findFirst({
            where: {
                name: 'CONTRACT'
            }
        })
        const SAFE_ADDRESS = await this.prisma.setting.findFirst({
            where: {
                name: 'SAFE_WALLET'
            }
        })
        console.log(CONTRACTS)
        const signer = process.env.DEPLOYER_PRIVATE_KEY

        const RPC_URL = 'https://sepolia.base.org'

        console.log({ SAFE_ADDRESS })
        const TOKEN_ADDRESS = '0x40BdA327da6460B106001709ef2F730825c634D8'

        const C2C_ADDRESS = '0x3A28d71a89123e8894A1Ac536c0623CA22022AE8'
        // return Safe.init({
        //     provider: RPC_URL,
        //     signer,
        //     safeAddress: SAFE_ADDRESS
        // })

    }
}
