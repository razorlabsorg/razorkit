import { useMemo } from "react";
import { useWallet } from "./useWallet";
import { useChain } from "./useChain";

export function useAccount() {
  const wallet = useWallet();
  const chain = useChain();

  const address = wallet.address;
  const status = wallet.status;
  const reconnecting = wallet.reconnecting;
  const chainId = chain?.id;
  const connector = wallet.adapter;
  const isConnected = wallet.connected;
  const isConnecting = wallet.connecting;
  const isDisconnected = status === "disconnected";

  return {
    address,
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