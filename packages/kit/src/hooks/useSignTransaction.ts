import { AnyRawTransaction } from '@aptos-labs/ts-sdk';
import { useWallet } from './useWallet';
import { useQuery } from '@tanstack/react-query';

export function useSignTransaction(
  transaction: AnyRawTransaction,
  asFeePayer?: boolean,
) {
  const wallet = useWallet();

  const signTransaction = async () => {
    const signedTransaction = await wallet.signTransaction(
      transaction,
      asFeePayer,
    );
    return signedTransaction;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['signTransaction', transaction, asFeePayer],
    queryFn: signTransaction,
    enabled: !!transaction,
    retry: 5,
  });

  return { signedTransaction: data, isLoading, error };
}
