import {
  AptosChain,
  StandardEventsListeners,
  AptosWallet,
  WalletAccount,
} from '@aptos-labs/wallet-standard';
import { IAptosWalletAdapter } from './interfaces/IAptosWalletAdapter';

export type AptosWalletRadarSubscriptionInput = (
  wallets: IAptosWalletAdapter[],
) => void;
export type AptosWalletRadarSubscriptionOutput = () => void;

export type AptosWalletEvent =
  | keyof StandardEventsListeners
  | 'chainChange'
  | 'featureChange'
  | 'accountChange';

export type AptosWalletEventListeners = StandardEventsListeners & {
  chainChange: (params: AptosChainChangeParams) => void;
  featureChange: (params: AptosFeatureChangeParams) => void;
  accountChange: (params: AptosAccountChangeParams) => void;
};

export interface AptosChainChangeParams {
  chain: AptosChain;
}

export interface AptosAccountChangeParams {
  account: WalletAccount;
}

export interface AptosFeatureChangeParams {
  features: AptosWallet['features'];
}
