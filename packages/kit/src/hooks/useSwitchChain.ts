import { useCallback } from "react";
import { useWallet } from "./useWallet";

export function useSwitchChain() {
  const wallet = useWallet();

  const switchChain = useCallback((chainId: number) => {
    wallet.changeNetwork(chainId);
  }, [wallet]);

  return {
    switchChain,
  };
}