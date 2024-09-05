import { ISuiWalletAdapter, ISuiWalletRadar } from './interfaces';
import {
  SuiWalletRadarSubscriptionInput,
  SuiWalletRadarSubscriptionOutput,
} from './types';
import {
  getWallets,
  Wallet,
  Wallets as WalletStandardSdk,
} from '@mysten/wallet-standard';
import { isStandardWalletAdapterCompatibleWallet } from './utils';
import { SuiWalletAdapter } from './SuiWalletAdapter';

export class SuiWalletRadar implements ISuiWalletRadar {
  private walletStandardSdk: WalletStandardSdk | null;
  private walletAdapterMap: Map<string, ISuiWalletAdapter>;
  private clearOnRegisterListener: null | (() => void);
  private subscriptions = new Set<SuiWalletRadarSubscriptionInput>();

  constructor() {
    this.walletStandardSdk = null;
    this.clearOnRegisterListener = null;
    this.walletAdapterMap = new Map();
  }

  activate(): void {
    this.walletStandardSdk = getWallets();
    const initialWalletAdapters = this.walletStandardSdk.get();
    initialWalletAdapters.forEach((adapter) => {
      this.setDetectedWalletAdapters(adapter);
    });
    this.clearOnRegisterListener = this.walletStandardSdk.on(
      'register',
      (...newAdapters) => {
        newAdapters.forEach((adapter) => {
          this.setDetectedWalletAdapters(adapter);
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

  getDetectedWalletAdapters(): ISuiWalletAdapter[] {
    return Array.from(this.walletAdapterMap.values());
  }

  subscribe(
    callback: SuiWalletRadarSubscriptionInput,
  ): SuiWalletRadarSubscriptionOutput {
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

  private setDetectedWalletAdapters(rawAdapter: Wallet) {
    if (!isStandardWalletAdapterCompatibleWallet(rawAdapter)) return;
    if (this.walletAdapterMap.has(rawAdapter.name)) return;

    this.walletAdapterMap.set(
      rawAdapter.name,
      new SuiWalletAdapter(rawAdapter),
    );
  }
}
