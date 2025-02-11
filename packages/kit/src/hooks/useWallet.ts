import { AnyRawTransaction } from '@aptos-labs/ts-sdk';
import {
  AptosChangeNetworkOutput,
  AptosSignAndSubmitTransactionInput,
  AptosSignAndSubmitTransactionOutput,
  AptosSignMessageInput,
  AptosSignMessageOutput,
  AptosSignTransactionOutput,
  UserResponse,
  WalletAccount,
} from '@aptos-labs/wallet-standard';
import {
  Chain,
  ConnectionStatus,
  IWallet,
  KitError,
  IWalletAdapter,
} from '@razorlabs/wallet-sdk';
import { createContext, useContext } from 'react';

export interface WalletContextState {
  configuredWallets: IWallet[];
  detectedWallets: IWallet[];
  allAvailableWallets: IWallet[];
  chains: Chain[];
  chain: Chain | undefined;
  name: string | undefined; // name of the connected wallet
  adapter: IWalletAdapter | undefined; // adapter provided by the connected wallet
  account: WalletAccount | undefined; // current account (the first account of accounts)
  address: string | undefined; // alias for account.address
  connecting: boolean;
  reconnecting: boolean;
  connected: boolean;
  status: 'disconnected' | 'connected' | 'connecting' | 'reconnecting';
  select: (walletName: string) => Promise<void>;
  disconnect: () => Promise<void>;
  getAccounts: () => readonly WalletAccount[];
  changeNetwork: (input: number) => Promise<UserResponse<AptosChangeNetworkOutput>>;

  signAndSubmitTransaction(
    input: AptosSignAndSubmitTransactionInput,
  ): Promise<UserResponse<AptosSignAndSubmitTransactionOutput>>;

  signTransaction(
    transaction: AnyRawTransaction,
    asFeePayer?: boolean,
  ): Promise<UserResponse<AptosSignTransactionOutput>>;

  signMessage(
    input: AptosSignMessageInput,
  ): Promise<UserResponse<AptosSignMessageOutput>>;
}

function missProviderMessage(action: string) {
  return `Failed to call ${action}, missing context provider to run within`;
}

const DEFAULT_CONTEXT: WalletContextState = {
  configuredWallets: [],
  detectedWallets: [],
  allAvailableWallets: [],
  chains: [],
  chain: undefined,
  name: undefined,
  adapter: undefined,
  connecting: false,
  reconnecting: false,
  connected: false,
  account: undefined,
  status: ConnectionStatus.DISCONNECTED,
  address: undefined,
  async select() {
    throw new KitError(missProviderMessage('select'));
  },
  async disconnect() {
    throw new KitError(missProviderMessage('disconnect'));
  },
  getAccounts() {
    throw new KitError(missProviderMessage('getAccounts'));
  },
  async changeNetwork() {
    throw new KitError(missProviderMessage('changeNetwork'));
  },
  async signAndSubmitTransaction() {
    throw new KitError(missProviderMessage('signAndSubmitTransaction'));
  },
  async signTransaction() {
    throw new KitError(missProviderMessage('signTransaction'));
  },
  async signMessage() {
    throw new KitError(missProviderMessage('signMessage'));
  },
};

export const WalletContext = createContext<WalletContextState>(DEFAULT_CONTEXT);

export function useWallet(): WalletContextState {
  return useContext(WalletContext);
}
