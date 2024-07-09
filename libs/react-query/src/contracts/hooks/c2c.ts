// import { useMutation } from '@tanstack/react-query';
// import { encodeFunctionData, parseEther } from 'viem';
// import {
//   c2CProjectAbi,
//   useWriteC2CProjectMulticall,
// } from '../generated-hooks/c2c';
// import { useRSQuery } from '@rumsan/react-query';

// //Temporary solution, should be changed when crypto is implemented
// export const useDepositTokenToProject = () => {
//   //   const write = useWriteContract({
//   //     config: {
//   //   }
//   // })
// };

// export const useDisburseTokenToBeneficiaries = () => {
//   const multi = useWriteC2CProjectMulticall();
//   const { queryClient } = useRSQuery();

//   return useMutation(
//     {
//       onError: (error) => {
//         console.error(error);
//       },
//       onSuccess: (d) => {
//         console.log('success', d);
//       },
//       mutationFn: async ({
//         amount,
//         beneficiaryAddresses,
//         rahatTokenAddress,
//         c2cProjectAddress,
//       }: {
//         beneficiaryAddresses: `0x${string}`[];
//         amount: string;
//         rahatTokenAddress: `0x{string}`;
//         c2cProjectAddress: `0x{string}`;
//       }) => {
//         const encodeAssignClaimsToBeneficiary = beneficiaryAddresses.map(
//           (beneficiary) => {
//             return encodeFunctionData({
//               abi: c2CProjectAbi,
//               functionName: 'assignClaims',
//               args: [beneficiary, c2cProjectAddress, parseEther(amount)],
//             });
//           }
//         );
//         console.log(`first`);
//         await multi.writeContractAsync({
//           args: [encodeAssignClaimsToBeneficiary],
//           address: c2cProjectAddress,
//         });
//         console.log(`second`);

//         const encodeGetBeneficiaryClaims = beneficiaryAddresses.map(
//           (beneficiary) => {
//             return encodeFunctionData({
//               abi: c2CProjectAbi,
//               functionName: 'beneficiaryClaims',
//               args: [beneficiary],
//             });
//           }
//         );
//         console.log({ encodeGetBeneficiaryClaims });
//         // const claims = await multi.writeContractAsync({
//         //   args: [encodeGetBeneficiaryClaims],
//         //   address: rahatTokenAddress,
//         // });
//         // console.log('claims', claims);
//         // const encodedForDisburse = beneficiaryAddresses.map((beneficiary) => {
//         //   return encodeFunctionData({
//         //     abi: c2CProjectAbi,
//         //     functionName: 'processTransferToBeneficiary',
//         //     args: [beneficiary, rahatTokenAddress, parseEther(amount)],
//         //   });
//         // });
//         // return multi.writeContractAsync({
//         //   args: [encodedForDisburse],
//         //   address: rahatTokenAddress,
//         // });
//       },
//     },
//     queryClient
//   );
// };
