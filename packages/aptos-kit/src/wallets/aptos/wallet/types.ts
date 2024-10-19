import type { IAptosWalletAdapter } from '../wallet-standard';

/**
 * Represents a wallet that can connect to the Aptos network.
 *
 * @property {string} name - The name of the wallet.
 * @property {string} label - The label of the wallet.
 * @property {IAptosWalletAdapter | undefined} adapter - The wallet adapter.
 * @property {boolean | undefined} installed - Whether the wallet is installed.
 * @property {string} iconUrl - The URL of the icon of the wallet.
 * @property {{ browserExtension?: string }} downloadUrl - The download URL of the wallet.
 */
export interface IAptosWallet {
  name: string;
  label: string;
  adapter: IAptosWalletAdapter;
  installed: boolean;
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
export type IDefaultAptosWallet = Omit<
  IAptosWallet,
  keyof {
    adapter: any;
    installed: any;
  }
>;
