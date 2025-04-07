import { useEffect, useRef, useState } from 'react';
import {
  IWalletAdapter,
  IWalletRadar,
  WalletAdapter,
  WalletRadar,
} from '@razorlabs/wallet-sdk';
import { MSafeConfig, MSafeWallet } from '@msafe/aptos-aip62-wallet';
import { Network } from '@aptos-labs/ts-sdk';

export const msafeConfig: MSafeConfig = {
  network: Network.CUSTOM
} 

// Create MSafe wallet adapter
export const msafeWallet = new MSafeWallet(msafeConfig);

export const msafeAdapter = new WalletAdapter(msafeWallet);

/**
 * detect wallet adapters that support wallet-standard from window and register event
 * normalize them to WalletAdapter
 * Notice: call once only in provider, cuz there is event registration
 */
export function useWalletAdapterDetection() {
  const walletRadar = useRef<IWalletRadar | null>(null);
  const [availableWalletAdapters, setAvailableWalletAdapters] = useState<
    IWalletAdapter[]
  >([]);

  useEffect(() => {
    if (!walletRadar.current) {
      walletRadar.current = new WalletRadar();
      walletRadar.current.activate();
    }

    const initialWalletAdapters = walletRadar.current.getDetectedWalletAdapters();
    
    // Make sure MSafe is included in the initial list
    setAvailableWalletAdapters([...initialWalletAdapters, msafeAdapter]);

    walletRadar.current.subscribe((newAptosWalletAdapters) => {
      // Always include MSafe in the updated list
      setAvailableWalletAdapters([...newAptosWalletAdapters, msafeAdapter]);
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
