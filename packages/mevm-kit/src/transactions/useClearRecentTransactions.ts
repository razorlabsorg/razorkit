import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useEthChainId } from '../hooks/useEthChainId';
import { useTransactionStore } from './TransactionStoreContext';

export function useClearRecentTransactions(): () => void {
  const store = useTransactionStore();
  const { address } = useAccount();
  const chainId = useEthChainId();

  return useCallback(() => {
    if (!address || !chainId) {
      throw new Error('No address or chain ID found');
    }

    store.clearTransactions(address, chainId);
  }, [store, address, chainId]);
}
