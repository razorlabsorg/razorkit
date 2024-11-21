export * from './components';
// export * from '@razorlabs/m1-wallet-sdk';
export * from '@razorlabs/m2-wallet-sdk';
export * from './hooks';

export type { IWalletAdapter as IAptosWalletAdapter } from '@razorlabs/m1-wallet-sdk';
export type { IWalletAdapter as ISuiWalletAdapter } from '@razorlabs/m2-wallet-sdk';
export type { IWallet as IAptosWallet } from '@razorlabs/m1-wallet-sdk';
export type { IWallet as ISuiWallet } from '@razorlabs/m2-wallet-sdk';
