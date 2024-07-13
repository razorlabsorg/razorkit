import type { IWalletAdapter } from '../wallet-standard';

export interface IWallet {
  name: string;
  label: string;
  adapter: IWalletAdapter;
  installed: boolean;
  iconUrl: string;
  downloadUrl: {
    browserExtension?: string; // chrome default
  };
}

export type IDefaultWallet = Omit<
  IWallet,
  keyof {
    adapter: any;
    installed: any;
  }
>;
