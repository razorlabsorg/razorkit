import { IAptosWalletAdapter } from './IAptosWalletAdapter';
import {
  AptosWalletRadarSubscriptionInput,
  AptosWalletRadarSubscriptionOutput,
} from '../types';

export interface IAptosWalletRadar {
  activate: () => void;
  deactivate: () => void;
  getDetectedWalletAdapters: () => IAptosWalletAdapter[];
  /**
   * Subscribe to detected wallet updates
   * @param callback
   */
  subscribe: (
    callback: AptosWalletRadarSubscriptionInput,
  ) => AptosWalletRadarSubscriptionOutput;
}
