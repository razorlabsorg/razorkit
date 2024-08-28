import { useCallback } from 'react';
import { useAccount } from 'wagmi';
import { useEthChainId } from '../hooks/useEthChainId';
import { useTransactionStore } from './TransactionStoreContext';
import { NewTransaction } from './transactionStore';

export function useAddRecentTransaction(): (
  transaction: NewTransaction,
) => void {
  const store = useTransactionStore();
  const { address } = useAccount();
  const chainId = useEthChainId();

  return useCallback(
    (transaction: NewTransaction) => {
      if (!address || !chainId) {
        throw new Error('No address or chain ID found');
      }

      store.addTransaction(address, chainId, transaction);
    },
    [store, address, chainId],
  );
}
