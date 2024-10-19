import { ISuiWalletAdapter } from './interfaces/ISuiWalletAdapter';
import {
  StandardEventsListeners,
  SuiChain,
  Wallet,
  WalletAccount,
} from '@mysten/wallet-standard';

export type SuiWalletRadarSubscriptionInput = (
  wallets: ISuiWalletAdapter[],
) => void;
export type SuiWalletRadarSubscriptionOutput = () => void;

export type SuiWalletEvent =
  | keyof StandardEventsListeners
  | 'chainChange'
  | 'featureChange'
  | 'accountChange';

export type SuiWalletEventListeners = StandardEventsListeners & {
  chainChange: (params: SuiChainChangeParams) => void;
  featureChange: (params: SuiFeatureChangeParams) => void;
  accountChange: (params: SuiAccountChangeParams) => void;
};

export interface SuiChainChangeParams {
  chain: SuiChain;
}

export interface SuiAccountChangeParams {
  account: WalletAccount;
}

export interface SuiFeatureChangeParams {
  features: Wallet['features'];
}
