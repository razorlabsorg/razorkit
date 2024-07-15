import { IWalletAdapter, IWalletRadar } from './interfaces';
import {
  WalletRadarSubscriptionInput,
  WalletRadarSubscriptionOutput,
} from './types';
import { isStandardWalletAdapterCompatibleWallet } from './utils';
import { WalletAdapter } from './WalletAdapter';
import {
  AptosWallet,
  getAptosWallets,
} from '@aptos-labs/wallet-standard';

export class WalletRadar implements IWalletRadar {
  private walletAdapterMap: Map<string, IWalletAdapter>;
  private clearOnRegisterListener: null | (() => void);
  private subscriptions = new Set<WalletRadarSubscriptionInput>();

  constructor() {
    this.clearOnRegisterListener = null;
    this.walletAdapterMap = new Map();
  }

  activate(): void {
    const { aptosWallets, on } = getAptosWallets();
    const initialWalletAdapters = aptosWallets;
    initialWalletAdapters.forEach((adapter) => {
      this.setDetectedWalletAdapters(adapter as AptosWallet);
    });
    this.clearOnRegisterListener = on(
      'register',
      (...newAdapters) => {
        newAdapters.forEach((adapter) => {
          this.setDetectedWalletAdapters(adapter as AptosWallet);
        });
        this.notifySubscribers();
      },
    );
  }

  deactivate(): void {
    if (this.clearOnRegisterListener) {
      this.clearOnRegisterListener();
    }
    this.walletAdapterMap.clear();
  }

  getDetectedWalletAdapters(): IWalletAdapter[] {
    return Array.from(this.walletAdapterMap.values());
  }

  subscribe(
    callback: WalletRadarSubscriptionInput,
  ): WalletRadarSubscriptionOutput {
    this.subscriptions.add(callback);
    return () => {
      this.subscriptions.delete(callback);
    };
  }

  private notifySubscribers() {
    this.subscriptions.forEach((subscription) => {
      subscription(this.getDetectedWalletAdapters());
    });
  }

  private setDetectedWalletAdapters(rawAdapter: AptosWallet) {
    if (!isStandardWalletAdapterCompatibleWallet(rawAdapter)) return;
    if (this.walletAdapterMap.has(rawAdapter.name)) return;

    this.walletAdapterMap.set(rawAdapter.name, new WalletAdapter(rawAdapter));
  }
}
