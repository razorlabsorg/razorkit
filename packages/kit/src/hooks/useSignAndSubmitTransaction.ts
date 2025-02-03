import { useWallet } from './useWallet';
import { useQuery } from '@tanstack/react-query';
import { AptosSignAndSubmitTransactionInput } from '@aptos-labs/wallet-standard';

export function useSignAndSubmitTransaction(
  input: AptosSignAndSubmitTransactionInput,
) {
  const wallet = useWallet();

  const signAndSubmitTransaction = async () => {
    const signedTransaction = await wallet.signAndSubmitTransaction(input);
    return signedTransaction;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['signAndSubmitTransaction', input],
    queryFn: signAndSubmitTransaction,
    enabled: !!input,
    retry: 5,
  });

  return { signedTransaction: data, isLoading, error };
}
