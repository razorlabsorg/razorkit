import { useMemo } from 'react';
import { useSuiWallet } from './useSuiWallet';

/**
 * use chain config from context by chainId
 * @param chainId
 */
export function useSuiChain(chainId?: string | number) {
  const wallet = useSuiWallet();

  const memoizedChain = useMemo(() => {
    return wallet.chains.find((w) => w.id === chainId);
  }, [chainId, wallet.chains]);

  if (!chainId) return wallet.chain;

  return memoizedChain;
}
