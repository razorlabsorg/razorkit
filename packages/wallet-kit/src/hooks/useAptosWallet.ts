import { AnyRawTransaction } from '@aptos-labs/ts-sdk';
import {
  AptosSignAndSubmitTransactionInput,
  AptosSignAndSubmitTransactionOutput,
  AptosSignMessageInput,
  AptosSignMessageOutput,
  AptosSignTransactionOutput,
  UserResponse,
  WalletAccount,
} from '@aptos-labs/wallet-standard';
import { createContext, useContext } from 'react';
import { IAptosWallet } from '../wallets/aptos/wallet';
import { AptosChain } from '../chains/aptos';
import { IAptosWalletAdapter } from '../wallets/aptos/wallet-standard';
import { ConnectionStatus } from '../common';
import { KitError } from '../error-handling';

export interface AptosWalletContextState {
  configuredWallets: IAptosWallet[];
  detectedWallets: IAptosWallet[];
  allAvailableWallets: IAptosWallet[];
  chains: AptosChain[];
  chain: AptosChain | undefined;
  name: string | undefined; // name of the connected wallet
  adapter: IAptosWalletAdapter | undefined; // adapter provided by the connected wallet
  account: WalletAccount | undefined; // current account (the first account of accounts)
  address: string | undefined; // alias for account.address
  connecting: boolean;
  connected: boolean;
  status: 'disconnected' | 'connected' | 'connecting';
  select: (walletName: string) => Promise<void>;
  disconnect: () => Promise<void>;
  getAccounts: () => readonly WalletAccount[];

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

const DEFAULT_CONTEXT: AptosWalletContextState = {
  configuredWallets: [],
  detectedWallets: [],
  allAvailableWallets: [],
  chains: [],
  chain: undefined,
  name: undefined,
  adapter: undefined,
  connecting: false,
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
  async signAndSubmitTransaction() {
    throw new KitError(missProviderMessage('signAndSubmitTransaction'));
  },
  async signTransaction() {
    throw new KitError(missProviderMessage('signTransaction'));
  },
  async signMessage() {
    throw new KitError(missProviderMessage('signMessage'));
  },
  /* verifySignedMessage() {
    throw new KitError(missProviderMessage('verifySignedMessage'));
  }, */
};

export const AptosWalletContext =
  createContext<AptosWalletContextState>(DEFAULT_CONTEXT);

export function useAptosWallet(): AptosWalletContextState {
  return useContext(AptosWalletContext);
}
