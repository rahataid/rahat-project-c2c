import {
  Contract,
  JsonRpcProvider,
  SignatureLike,
  ethers,
  hashMessage,
  id,
  recoverAddress,
} from 'ethers';

export { isAddress } from 'ethers';

type IStringArr = string[];
type ICallData = IStringArr[];

export async function createContractInstance(contractName: any, model: any) {
  //  Get Contract
  const contract = await getContractByName(contractName, model);

  //  Get RPC URL
  const res = await model.findFirstOrThrow({
    where: {
      name: 'BLOCKCHAIN',
    },
    select: {
      name: true,
      value: true,
    },
  });

  //  Create Provider
  const provider = new JsonRpcProvider(res?.value?.rpcUrl);

  //  Create an instance of the contract
  return new Contract(contract.ADDRESS, contract.ABI, provider);
}

export async function createContractInstanceSign(contract: any, model: any) {
  //  Get Contract
  //   const contract = await this.getContractByName(projectName);

  //  Get RPC URL
  const res = await model.findFirstOrThrow({
    where: {
      name: 'BLOCKCHAIN',
    },
    select: {
      name: true,
      value: true,
    },
  });

  //  Create wallet from private key
  const provider = new JsonRpcProvider(res?.value?.RPCURL);
  const privateKey = process.env.RAHAT_ADMIN_PRIVATE_KEY;

  const wallet = new ethers.Wallet(privateKey, provider);

  const convertToLowerCase = (obj) => {
    const newObj = {};
    for (const key in obj) {
      const newKey = key.toLowerCase();
      const value = obj[key];
      if (Array.isArray(value)) {
        newObj[newKey] = value.map(convertToLowerCase);
      } else if (typeof value === 'object') {
        newObj[newKey] = convertToLowerCase(value);
      } else {
        newObj[newKey] = value;
      }
    }
    return newObj;
  };

  const abi = contract.ABI.map(convertToLowerCase);
  //  Create an instance of the contract
  const contracts = new Contract(contract.ADDRESS, abi, wallet);
  return contracts;
}

export const signMessage = async ({ wallet, message }: any) => {
  try {
    const signature = await wallet.signMessage(JSON.stringify(message));
    return signature;
  } catch (error: any) {
    console.error('Error signing message:', error.message);
    throw error.message;
  }
};

export function verifyMessage(
  message: Uint8Array | string,
  sig: SignatureLike
): string {
  const digest = hashMessage(message);
  return recoverAddress(digest, sig);
}

export async function generateMultiCallData(
  contract: ethers.Contract,
  functionName: string,
  callData: ICallData
) {
  const encodedData = [];
  if (callData) {
    for (const callD of callData) {
      const encodedD = contract.interface.encodeFunctionData(functionName, [
        ...callD,
      ]);
      encodedData.push(encodedD);
    }
  }
  return encodedData;
}

export async function multiSend(
  contract: ethers.Contract,
  functionName: string,
  callData?: ICallData
) {
  const encodedData = await generateMultiCallData(
    contract,
    functionName,
    callData
  );
  const tx = await contract.multicall(encodedData);
  const result = await tx.wait();
  return result;
}

export async function multiCall(
  contract: ethers.Contract,
  functionName: string,
  callData?: ICallData
) {
  const encodedData = await generateMultiCallData(
    contract,
    functionName,
    callData
  );
  return contract.multicall.staticCall(encodedData);
}

export async function generateMultiFunctionCallData(
  contract: ethers.Contract,
  functionName: string[],
  callData: ICallData
) {
  const encodedData = [];
  if (callData) {
    callData.forEach((callD, i) => {
      const encodedD = contract.interface.encodeFunctionData(functionName[i], [
        ...callD,
      ]);
      encodedData.push(encodedD);
    });
  }
  return encodedData;
}

export async function multiFunctionCall(
  contract: ethers.Contract,
  functionName: string[],
  callData?: ICallData
) {
  const encodedData = await generateMultiFunctionCallData(
    contract,
    functionName,
    callData
  );
  const result = await contract.multicall.staticCall(encodedData);
  const decodedResult = result.map((res: any, i: number) => {
    const decoded = contract.interface.decodeFunctionResult(
      functionName[i],
      res
    );
    return decoded;
  });
  return decodedResult;
}

export function getHash(data: string) {
  return id(data);
}

export async function getFunctionsList(contractInstance: any) {
  const functions = contractInstance.interface.fragments;
  const funcArr = [];
  functions.forEach((fragment: any) => {
    if (fragment.type === 'function') {
      funcArr.push(fragment?.name);
    }
  });

  return funcArr;
}

export async function getContractByName(contractName: string, modal: any) {
  const abis = await modal.findMany({
    where: { name: 'CONTRACT' },
  });
  const contractABI = abis[0].value[contractName];

  // const address = addresses.find((address) => address.value === contractName);
  if (!contractABI) {
    throw new Error('Contract not found');
  }
  return contractABI;
}

function findValueByKey(data, keyToFind) {
  // Iterate through the array of objects
  for (const obj of data) {
    console.log({ obj, data });
    // Check if the current object has a value property and if it contains the key we're looking for
    if (Object.prototype.hasOwnProperty.call(obj.value, keyToFind)) {
      // Return the value associated with the key
      console.log(`first`);
      return obj.value[keyToFind];
    }
  }
  // If the key is not found in any of the objects, return undefined
  return undefined;
}
