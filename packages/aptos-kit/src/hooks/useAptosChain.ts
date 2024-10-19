import { useMemo } from 'react';
import { useAptosWallet } from './useAptosWallet';

/**
 * use chain config from context by chainId
 * @param chainId
 */
export function useAptosChain(chainId?: string | number) {
  const wallet = useAptosWallet();

  const memoizedChain = useMemo(() => {
    return wallet.chains.find((w) => w.id === chainId);
  }, [chainId, wallet.chains]);

  if (!chainId) return wallet.chain;

  return memoizedChain;
}
