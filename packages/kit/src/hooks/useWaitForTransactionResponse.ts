import { WaitForTransactionOptions } from '@aptos-labs/ts-sdk';
import { useChain } from './useChain';
import { useProvider } from './useProvider';
import { useQuery } from '@tanstack/react-query';

export function useWaitForTransactionResponse(
  txHash: string,
  options?: WaitForTransactionOptions,
) {
  const chain = useChain();
  const provider = useProvider(chain?.rpcUrl!, chain?.indexerUrl);

  const waitForTransactionResponse = async () => {
    const receipt = await provider.waitForTransaction({
      transactionHash: txHash,
      options,
    });

    return receipt;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['waitForTransactionResponse', txHash, options],
    queryFn: waitForTransactionResponse,
    enabled: !!txHash,
    retry: 5,
  });

  return { response: data, isLoading, error };
}
