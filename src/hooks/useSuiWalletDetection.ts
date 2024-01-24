import { useEffect, useRef, useState } from 'react';
import {
  IAptosWalletAdapter,
  ISuiWalletAdapter,
  IWalletRadar,
  WalletRadar,
} from '@razorlabs/wallet-sdk';

/**
 * detect wallet adapters that support wallet-standard from window and register event
 * normalize them to WalletAdapter
 * Notice: call once only in provider, cuz there is event registration
 */
export function useSuiWalletAdapterDetection() {
  const walletRadar = useRef<IWalletRadar | null>(null);
  const [availableWalletAdapters, setAvailableWalletAdapters] = useState<
    ISuiWalletAdapter[] | IAptosWalletAdapter[]
  >([]);
  // console.log("--availableWalletAdapters", availableWalletAdapters);

  useEffect(() => {
    if (!walletRadar.current) {
      walletRadar.current = new WalletRadar();
      walletRadar.current.activate();
    }

    const initialWalletAdapters =
      walletRadar.current.getDetectedSuiWalletAdapters();
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
