import { useEffect, useRef, useState } from 'react';
import {
  AptosWalletRadar,
  IAptosWalletAdapter,
  IAptosWalletRadar,
} from '../wallets/aptos/wallet-standard';

/**
 * detect wallet adapters that support wallet-standard from window and register event
 * normalize them to WalletAdapter
 * Notice: call once only in provider, cuz there is event registration
 */
export function useAptosWalletAdapterDetection() {
  const walletRadar = useRef<IAptosWalletRadar | null>(null);
  const [availableWalletAdapters, setAvailableWalletAdapters] = useState<
    IAptosWalletAdapter[]
  >([]);
  // console.log("--availableWalletAdapters", availableWalletAdapters);

  useEffect(() => {
    if (!walletRadar.current) {
      walletRadar.current = new AptosWalletRadar();
      walletRadar.current.activate();
    }

    const initialWalletAdapters =
      walletRadar.current.getDetectedWalletAdapters();
    setAvailableWalletAdapters(initialWalletAdapters);

    walletRadar.current.subscribe((newAptosWalletAdapters) => {
      setAvailableWalletAdapters(newAptosWalletAdapters);
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
