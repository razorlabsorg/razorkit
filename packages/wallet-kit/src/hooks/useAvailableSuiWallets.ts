import { useMemo } from 'react';
import { isNonEmptyArray } from '../utils/check';
import { useSuiWalletAdapterDetection } from './useSuiWalletDetection';
import { IDefaultSuiWallet, ISuiWallet } from '../wallets/sui/wallet';

export const useAvailableSuiWallets = (defaultWallets: IDefaultSuiWallet[]) => {
  const { data: availableWalletAdapters } = useSuiWalletAdapterDetection();
  // configured wallets
  const configuredWallets: ISuiWallet[] = useMemo(() => {
    if (!isNonEmptyArray(defaultWallets)) return [];
    if (!isNonEmptyArray(availableWalletAdapters)) {
      return defaultWallets.map(
        (item) =>
          ({
            ...item,
            adapter: undefined,
            installed: false,
          }) as ISuiWallet,
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
        } as ISuiWallet;
      }
      return {
        ...item,
        adapter: undefined,
        installed: false,
      } as ISuiWallet;
    });
  }, [defaultWallets, availableWalletAdapters]);

  // detected wallets
  const detectedWallets: ISuiWallet[] = useMemo(() => {
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
  const allAvailableWallets: ISuiWallet[] = useMemo(() => {
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
