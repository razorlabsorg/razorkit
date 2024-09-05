import { useEffect, useRef } from 'react';
import { isNonEmptyArray } from '../utils/check';
import { Storage } from '../utils/storage';
import { ISuiWallet } from '../wallets/sui/wallet';
import { ConnectionStatus } from './useConnectionStatus';
import { StorageKey } from '../config/storage';

export function useSuiAutoConnect(
  select: (name: string) => Promise<void>,
  status: ConnectionStatus,
  allAvailableWallets: ISuiWallet[],
  autoConnect: boolean,
) {
  const init = useRef(false);

  // auto connect
  useEffect(() => {
    if (
      !autoConnect ||
      init.current ||
      !isNonEmptyArray(allAvailableWallets) ||
      status !== 'disconnected'
    )
      return;

    const storage = new Storage();
    const lastConnectedWalletName = storage.getItem(
      StorageKey.LAST_CONNECT_WALLET_NAME,
    );
    if (!lastConnectedWalletName) return;

    if (
      allAvailableWallets.find((item) => item.name == lastConnectedWalletName)
    ) {
      // console.log('auto connect to wallet:', lastConnectedWalletName)
      select(lastConnectedWalletName)
        .then(() => {
          init.current = true;
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((_) => {
          // failed silently
        });
    }
  }, [allAvailableWallets, autoConnect, select, status]);
}
