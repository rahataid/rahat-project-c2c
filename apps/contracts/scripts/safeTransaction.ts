import SafeApiKit from '@safe-global/api-kit'
import Safe from '@safe-global/protocol-kit'
import {
    MetaTransactionData,
    OperationType
} from '@safe-global/safe-core-sdk-types'


// https://chainlist.org/?search=sepolia&testnets=true
const RPC_URL = 'https://sepolia.base.org'

const SAFE_ADDRESS = '0x8241F385c739F7091632EEE5e72Dbb62f2717E76'

const OWNER_1_ADDRESS = '0xcDEe632FB1Ba1B3156b36cc0bDabBfd821305e06'
const OWNER_1_PRIVATE_KEY = '8a104251f94eba07cb8c2a4407ca3e975c037a35a6fddc81ac4bcfd49ce6bb32'
const OWNER_2_ADDRESS = '0xbFD3d0ec185E402b83f5b770e2a4D2dd1a6D94e3'
const OWNER_2_PRIVATE_KEY = 'e49b967fc356764d3f211fc70aac35b195a933301ff73688a363db0b246e592e'



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
    // Create transaction
    const safeTransactionData: MetaTransactionData = {
        to: '0xcDEe632FB1Ba1B3156b36cc0bDabBfd821305e06',
        value: '10000', // in wei
        data: '0x',
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
    // await createTransaction()

    const owners = await getOwnersList();

    // const confirmations = await getConfirmations('0x3c4ba73cee3e33eee35c7f489178a0862f837253f1100ed6afaf051c616da385');

    const approvals = await getApprovals('0x3c4ba73cee3e33eee35c7f489178a0862f837253f1100ed6afaf051c616da385');

    console.log(owners, approvals)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });



