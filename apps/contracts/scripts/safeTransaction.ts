import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import {
    MetaTransactionData,
    OperationType
} from '@safe-global/safe-core-sdk-types'

import { ethers } from 'ethers'
import fs from 'fs'
import { erc20 } from '../typechain-types/@openzeppelin/contracts/token'

// https://chainlist.org/?search=sepolia&testnets=true
const RPC_URL = 'https://sepolia.base.org'

const SAFE_ADDRESS = '0x8241F385c739F7091632EEE5e72Dbb62f2717E76'

const TOKEN_ADDRESS = '0x40BdA327da6460B106001709ef2F730825c634D8'

const C2C_ADDRESS = '0x3A28d71a89123e8894A1Ac536c0623CA22022AE8'

const OWNER_1_ADDRESS = '0xC52e90DB78DeB581D6CB8b5aEBda0802bA8F37B5'
const OWNER_1_PRIVATE_KEY = '5fbfba72d025d3ab62849a654b5d90f7839af854f7566fc0317251e6becc17ac'
const getTokenContract = async (contractAddress: string) => {
    console.log('Reading contract')
    const { abi } = JSON.parse((fs.readFileSync(`${__dirname}/RahatToken.json`).toString()))
    console.log({ abi })
    return new ethers.Contract(contractAddress, abi, new ethers.JsonRpcProvider(RPC_URL))
}

const apiKit = new SafeApiKit({
    chainId: 84532n
})

const initSafe = async (ownerPrivateKey: string) => {
    return Safe.init({
        provider: RPC_URL,
        signer: ownerPrivateKey,
        safeAddress: SAFE_ADDRESS
    })
}

const createTransaction = async () => {

    const protocolKitOwner1 = await initSafe(OWNER_1_PRIVATE_KEY)

    const tokenContract = await getTokenContract(TOKEN_ADDRESS)
    console.log({ tokenContract })
    const tokenApprovalEncodedData = tokenContract.interface.encodeFunctionData('approve', [C2C_ADDRESS, ethers.parseEther('10')])
    console.log("encodedData", tokenApprovalEncodedData)
    // Create transaction
    const safeTransactionData: MetaTransactionData = {
        to: TOKEN_ADDRESS,
        value: '0', // in wei
        data: tokenApprovalEncodedData,
        operation: OperationType.Call
    }

    const safeTransaction = await protocolKitOwner1.createTransaction({
        transactions: [safeTransactionData]
    })

    const safeTxHash = await protocolKitOwner1.getTransactionHash(safeTransaction)
    const signature = await protocolKitOwner1.signHash(safeTxHash)

    console.log({
        safeAddress: SAFE_ADDRESS,
        safeTransactionData: safeTransaction.data,
        safeTxHash,
        senderAddress: OWNER_1_ADDRESS,
        senderSignature: signature.data
    })
    // Propose transaction to the service
    await apiKit.proposeTransaction({
        safeAddress: SAFE_ADDRESS,
        safeTransactionData: safeTransaction.data,
        safeTxHash,
        senderAddress: OWNER_1_ADDRESS,
        senderSignature: signature.data
    })

    console.log('Transaction created')

    const transaction = await apiKit.getTransaction(safeTxHash)
    console.log({ transaction })

}

const getTransactionData = async (safeTxHash: string) => {
    return apiKit.getTransaction(safeTxHash)

}

const getOwnersList = async () => {
    const { owners } = await apiKit.getSafeInfo(SAFE_ADDRESS)
    return owners;
}

const getConfirmations = async (safeTxHash: string) => {
    const { confirmations } = await apiKit.getTransaction(safeTxHash)
    return confirmations
}
const getApprovals = async (safeTxHash: string) => {
    const owners = await getOwnersList();
    const confirmations = await getConfirmations(safeTxHash);
    return owners.map(owner => {
        const confirmation = confirmations?.find(confirmation => confirmation.owner === owner)
        return {
            owner,
            submissionDate: confirmation?.submissionDate || null,
            hasApproved: confirmation ? true : false
        }
    }
    )
}


const main = async () => {
    await createTransaction()

    //const owners = await getOwnersList();

    // const confirmations = await getConfirmations('0x3c4ba73cee3e33eee35c7f489178a0862f837253f1100ed6afaf051c616da385');

    // const approvals = await getApprovals('0xe17f2d3b5b5397dc565b42a1de5bff79a0e1450f3b832aa46e954d869e40a1fc');

    // console.log(approvals)

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });



