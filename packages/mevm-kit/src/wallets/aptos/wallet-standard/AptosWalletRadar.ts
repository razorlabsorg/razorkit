import { IAptosWalletAdapter, IAptosWalletRadar } from './interfaces';
import {
  AptosWalletRadarSubscriptionInput,
  AptosWalletRadarSubscriptionOutput,
} from './types';
import { isStandardWalletAdapterCompatibleWallet } from './utils';
import { AptosWalletAdapter } from './AptosWalletAdapter';
import { AptosWallet, getAptosWallets } from '@aptos-labs/wallet-standard';

export class AptosWalletRadar implements IAptosWalletRadar {
  private walletAdapterMap: Map<string, IAptosWalletAdapter>;
  private clearOnRegisterListener: null | (() => void);
  private subscriptions = new Set<AptosWalletRadarSubscriptionInput>();

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
    this.clearOnRegisterListener = on('register', (...newAdapters) => {
      newAdapters.forEach((adapter) => {
        this.setDetectedWalletAdapters(adapter as AptosWallet);
      });
      this.notifySubscribers();
    });
  }

  deactivate(): void {
    if (this.clearOnRegisterListener) {
      this.clearOnRegisterListener();
    }
    this.walletAdapterMap.clear();
  }

  getDetectedWalletAdapters(): IAptosWalletAdapter[] {
    return Array.from(this.walletAdapterMap.values());
  }

  subscribe(
    callback: AptosWalletRadarSubscriptionInput,
  ): AptosWalletRadarSubscriptionOutput {
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

    this.walletAdapterMap.set(
      rawAdapter.name,
      new AptosWalletAdapter(rawAdapter),
    );
  }
}
