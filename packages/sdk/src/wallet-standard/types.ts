import { AptosChain, StandardEventsListeners, AptosWallet, WalletAccount } from '@aptos-labs/wallet-standard';
import { IWalletAdapter } from './interfaces/IWalletAdapter';

export type WalletRadarSubscriptionInput = (wallets: IWalletAdapter[]) => void;
export type WalletRadarSubscriptionOutput = () => void;

export type WalletEvent = keyof StandardEventsListeners | 'chainChange' | 'featureChange' | 'accountChange';

export type WalletEventListeners = StandardEventsListeners & {
  chainChange: (params: ChainChangeParams) => void;
  featureChange: (params: FeatureChangeParams) => void;
  accountChange: (params: AccountChangeParams) => void;
};

export interface ChainChangeParams {
  chain: AptosChain;
}

export interface AccountChangeParams {
  account: WalletAccount;
}

export interface FeatureChangeParams {
  features: AptosWallet['features'];
}
