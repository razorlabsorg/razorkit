import { AptosSignMessageInput } from '@aptos-labs/wallet-standard';
import { useWallet } from './useWallet';
import { useQuery } from '@tanstack/react-query';

export function useSignMessage(input: AptosSignMessageInput) {
  const wallet = useWallet();

  const signMessage = async () => {
    const signedMessage = await wallet.signMessage(input);
    return signedMessage;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['signMessage', input],
    queryFn: signMessage,
    enabled: !!input,
    retry: 5,
  });

  return { signedMessage: data, isLoading, error };
}
