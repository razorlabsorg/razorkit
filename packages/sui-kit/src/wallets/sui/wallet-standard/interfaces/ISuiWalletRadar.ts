import { ISuiWalletAdapter } from './ISuiWalletAdapter';
import {
  SuiWalletRadarSubscriptionInput,
  SuiWalletRadarSubscriptionOutput,
} from '../types';

export interface ISuiWalletRadar {
  activate: () => void;
  deactivate: () => void;
  getDetectedWalletAdapters: () => ISuiWalletAdapter[];
  /**
   * Subscribe to detected wallet updates
   * @param callback
   */
  subscribe: (
    callback: SuiWalletRadarSubscriptionInput,
  ) => SuiWalletRadarSubscriptionOutput;
}
