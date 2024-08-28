/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMemo } from 'react';
import { isNonEmptyArray } from '../utils/check';
import { useAptosWalletAdapterDetection } from './useAptosWalletAdapterDetection';
import { IAptosWallet, IDefaultAptosWallet } from '../wallets/aptos/wallet';

export const useAvailableAptosWallets = (defaultWallets: IDefaultAptosWallet[]) => {
  const { data: availableWalletAdapters } = useAptosWalletAdapterDetection();
  // configured wallets
  const configuredWallets: IAptosWallet[] = useMemo(() => {
    if (!isNonEmptyArray(defaultWallets)) return [];
    if (!isNonEmptyArray(availableWalletAdapters)) {
      return defaultWallets.map(
        (item) =>
          // @ts-ignore
          ({
            ...item,
            adapter: undefined,
            installed: false,
          }) as IAptosWallet,
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
        } as IAptosWallet;
      }
      // @ts-ignore
      return {
        ...item,
        adapter: undefined,
        installed: false,
      } as IAptosWallet;
    });
  }, [defaultWallets, availableWalletAdapters]);

  // detected wallets
  const detectedWallets: IAptosWallet[] = useMemo(() => {
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
  const allAvailableWallets: IAptosWallet[] = useMemo(() => {
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
