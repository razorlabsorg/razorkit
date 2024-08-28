import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useEthChainId } from '../hooks/useEthChainId';
import { useTransactionStore } from './TransactionStoreContext';
import type { Transaction } from './transactionStore';

export function useRecentTransactions(): Transaction[] {
  const store = useTransactionStore();
  const { address } = useAccount();
  const chainId = useEthChainId();

  const [transactions, setTransactions] = useState(() =>
    store && address && chainId ? store.getTransactions(address, chainId) : [],
  );

  useEffect(() => {
    if (store && address && chainId) {
      setTransactions(store.getTransactions(address, chainId));

      return store.onChange(() => {
        setTransactions(store.getTransactions(address, chainId));
      });
    }
  }, [store, address, chainId]);

  return transactions;
}
