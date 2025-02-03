/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo } from 'react';
import { isNonEmptyArray } from '../utils/check';
import { useWalletAdapterDetection } from './useWalletAdapterDetection';
import { IDefaultWallet, IWallet } from '@razorlabs/wallet-sdk';

export const useAvailableWallets = (defaultWallets: IDefaultWallet[]) => {
  const { data: availableWalletAdapters } = useWalletAdapterDetection();
  // configured wallets
  const configuredWallets: IWallet[] = useMemo(() => {
    if (!isNonEmptyArray(defaultWallets)) return [];
    if (!isNonEmptyArray(availableWalletAdapters)) {
      return defaultWallets.map(
        (item) =>
          // @ts-ignore
          ({
            ...item,
            adapter: undefined,
            installed: false,
          }) as IWallet,
      );
    }

    return defaultWallets.map((item) => {
      const foundAdapter = availableWalletAdapters.find(
        (walletAdapter) => item.name === walletAdapter.name,
      );
      if (foundAdapter) {
        return {
          ...item,
          adapter: foundAdapter,
          installed: true,
        } as IWallet;
      }
      // @ts-ignore
      return {
        ...item,
        adapter: undefined,
        installed: false,
      } as IWallet;
    });
  }, [defaultWallets, availableWalletAdapters]);

  // detected wallets
  const detectedWallets: IWallet[] = useMemo(() => {
    if (!isNonEmptyArray(availableWalletAdapters)) return [];
    return availableWalletAdapters
      .filter((adapter) => {
        // filter adapters not shown in the configured list
        return !defaultWallets.find((wallet) => wallet.name === adapter.name);
      })
      .map((adapter) => {
        // normalized detected adapter to IWallet
        return {
          name: adapter.name,
          label: adapter.name,
          adapter: adapter,
          installed: true,
          iconUrl: adapter.icon,
          downloadUrl: {
            browserExtension: '', // no need to know
          },
        };
      });
  }, [defaultWallets, availableWalletAdapters]);

  // filter installed wallets
  const allAvailableWallets: IWallet[] = useMemo(() => {
    return [...configuredWallets, ...detectedWallets].filter(
      (wallet) => wallet.installed,
    );
  }, [configuredWallets, detectedWallets]);

  return {
    allAvailableWallets,
    configuredWallets,
    detectedWallets,
  };
};
