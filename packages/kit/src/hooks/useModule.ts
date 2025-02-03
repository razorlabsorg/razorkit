import {
  EntryFunctionArgumentTypes,
  SimpleEntryFunctionArgumentTypes,
  TypeArgument,
  InputEntryFunctionData,
  InputViewFunctionData,
  Account,
} from '@aptos-labs/ts-sdk';
import { useAbi } from './useAbi';
import { useChain } from './useChain';
import { useProvider } from './useProvider';
import { useWallet } from './useWallet';

export function useModule(address: string, moduleName: string) {
  const chain = useChain();
  const client = useProvider(chain?.rpcUrl!, chain?.indexerUrl);
  const module = useAbi(address, moduleName);
  const { signAndSubmitTransaction } = useWallet();

  const write = async (
    functionName: string,
    functionArguments: Array<
      EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
    >,
    typeArguments?: Array<TypeArgument>,
  ) => {
    const payload: InputEntryFunctionData = {
      function: `${module?.address}::${module?.name}::${functionName}`,
      functionArguments,
      typeArguments,
    };

    const txHash = await signAndSubmitTransaction({ payload: payload });
    return txHash;
  };

  const view = async (
    functionName: string,
    functionArguments: InputViewFunctionData['functionArguments'],
    typeArguments?: InputViewFunctionData['typeArguments'],
  ) => {
    const payload: InputViewFunctionData = {
      function: `${module?.address}::${module?.name}::${functionName}`,
      functionArguments,
      typeArguments,
    };

    const result = await client.view({ payload: payload });

    return result;
  };

  const simulate = async (
    functionName: string,
    functionArguments: Array<
      EntryFunctionArgumentTypes | SimpleEntryFunctionArgumentTypes
    >,
    typeArguments?: Array<TypeArgument>,
  ) => {
    const payload: InputEntryFunctionData = {
      function: `${module?.address}::${module?.name}::${functionName}`,
      functionArguments,
      typeArguments,
    };

    const dummyUser = Account.generate();

    const txn = await client.transaction.build.simple({
      sender: dummyUser.accountAddress,
      data: payload,
    });

    const result = await client.transaction.simulate.simple({
      signerPublicKey: dummyUser.publicKey,
      transaction: txn,
    });

    return result[0];
  };

  return { address, write, view, simulate, client }
}
