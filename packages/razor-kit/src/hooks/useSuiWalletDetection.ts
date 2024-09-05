import { useEffect, useRef, useState } from 'react';
import {
  ISuiWalletAdapter,
  ISuiWalletRadar,
  SuiWalletRadar,
} from '../wallets/sui/wallet-standard';

/**
 * detect wallet adapters that support wallet-standard from window and register event
 * normalize them to WalletAdapter
 * Notice: call once only in provider, cuz there is event registration
 */
export function useSuiWalletAdapterDetection() {
  const walletRadar = useRef<ISuiWalletRadar | null>(null);
  const [availableWalletAdapters, setAvailableWalletAdapters] = useState<
    ISuiWalletAdapter[]
  >([]);
  // console.log("--availableWalletAdapters", availableWalletAdapters);

  useEffect(() => {
    if (!walletRadar.current) {
      walletRadar.current = new SuiWalletRadar();
      walletRadar.current.activate();
    }

    const initialWalletAdapters =
      walletRadar.current.getDetectedWalletAdapters();
    setAvailableWalletAdapters(initialWalletAdapters);

    walletRadar.current.subscribe((newSuiWalletAdapters) => {
      setAvailableWalletAdapters(newSuiWalletAdapters);
    });

    return () => {
      if (walletRadar.current) {
        walletRadar.current.deactivate();
        walletRadar.current = null;
      }
    };
  }, []);

  return {
    data: availableWalletAdapters,
  };
}
