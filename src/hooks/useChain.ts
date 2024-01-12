import { useMemo } from 'react';
import { useWallet } from './useWallet';

/**
 * use chain config from context by chainId
 * @param chainId
 */
export function useChain(chainId?: string | number) {
  const wallet = useWallet();

  const memoizedChain = useMemo(() => {
    return wallet.chains.find((w) => w.id === chainId);
  }, [chainId, wallet.chains]);

  if (!chainId) return wallet.chain;

  return memoizedChain;
}
