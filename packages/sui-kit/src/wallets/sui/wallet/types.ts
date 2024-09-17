import type { ISuiWalletAdapter } from '../wallet-standard';

/**
 * Represents a wallet that can connect to the Sui network.
 *
 * @property {string} name - The name of the wallet.
 * @property {string} label - The label of the wallet.
 * @property {ISuiWalletAdapter | undefined} adapter - The wallet adapter.
 * @property {boolean | undefined} installed - Whether the wallet is installed.
 * @property {string} iconUrl - The URL of the icon of the wallet.
 * @property {{ browserExtension?: string }} downloadUrl - The download URL of the wallet.
 */
export interface ISuiWallet {
  name: string;
  label: string;
  adapter: ISuiWalletAdapter | undefined;
  installed: boolean | undefined;
  iconUrl: string;
  downloadUrl: {
    browserExtension?: string; // chrome default
  };
}

/**
 * Represents a default implementation of {@link IWallet}, omitting the `adapter` and `installed` properties.
 *
 * @property {string} name - The name of the wallet.
 * @property {string} label - The label of the wallet.
 * @property {string} iconUrl - The URL of the icon of the wallet.
 * @property {{ browserExtension?: string }} downloadUrl - The download URL of the wallet.
 */
export type IDefaultSuiWallet = Omit<
  ISuiWallet,
  keyof {
    adapter: any;
    installed: any;
  }
>;
