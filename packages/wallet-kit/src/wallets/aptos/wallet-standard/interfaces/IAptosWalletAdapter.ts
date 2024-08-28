import {
  AptosConnectMethod,
  AptosDisconnectMethod,
  AptosGetAccountMethod,
  AptosGetNetworkMethod,
  AptosOnAccountChangeMethod,
  AptosOnNetworkChangeMethod,
  AptosSignAndSubmitTransactionMethod,
  AptosSignMessageMethod,
  AptosSignTransactionMethod,
  WalletWithAptosFeatures,
} from '@aptos-labs/wallet-standard';

export type IAptosWalletAdapter = WalletWithAptosFeatures & {
  hasFeature: (name: string) => boolean;
  connect: AptosConnectMethod;
  disconnect: AptosDisconnectMethod;
  network: AptosGetNetworkMethod;
  account: AptosGetAccountMethod;
  onAccountChange: AptosOnAccountChangeMethod
  onNetworkChange: AptosOnNetworkChangeMethod
  signAndSubmitTransaction: AptosSignAndSubmitTransactionMethod;
  signTransaction: AptosSignTransactionMethod;
  signMessage: AptosSignMessageMethod;
};
