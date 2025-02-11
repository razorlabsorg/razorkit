import { useMemo } from "react";
import { useWallet } from "./useWallet";

export function useAccount() {
  const wallet = useWallet();

  const address = wallet.address;
  const status = wallet.status;
  const reconnecting = wallet.reconnecting;
  const chain = wallet.chain;
  const chainId = chain?.id;
  const connector = wallet.adapter;
  const isConnected = wallet.connected;
  const isConnecting = wallet.connecting;
  const isDisconnected = status === "disconnected";

  const addresses = useMemo(() => {
    return wallet.getAccounts().map((account) => account.address);
  }, [wallet]);

  return {
    address,
    addresses,
    chain,
    chainId,
    connector,
    status,
    isConnected,
    isConnecting,
    isDisconnected,
    reconnecting,
  };
}