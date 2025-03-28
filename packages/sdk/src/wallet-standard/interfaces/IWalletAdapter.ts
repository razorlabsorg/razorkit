import {
  AptosConnectMethod,
  AptosChangeNetworkMethod,
  AptosOpenInMobileAppMethod,
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

export type IWalletAdapter = WalletWithAptosFeatures & {
  hasFeature: (name: string) => boolean;
  connect: AptosConnectMethod;
  disconnect: AptosDisconnectMethod;
  network: AptosGetNetworkMethod;
  account: AptosGetAccountMethod;
  changeNetwork: AptosChangeNetworkMethod;
  openInMobileApp: AptosOpenInMobileAppMethod;
  onAccountChange: AptosOnAccountChangeMethod;
  onNetworkChange: AptosOnNetworkChangeMethod;
  signAndSubmitTransaction: AptosSignAndSubmitTransactionMethod;
  signTransaction: AptosSignTransactionMethod;
  signMessage: AptosSignMessageMethod;
};
