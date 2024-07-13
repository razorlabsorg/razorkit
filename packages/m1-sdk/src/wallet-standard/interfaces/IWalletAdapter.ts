import {
  AptosConnectFeature,
  AptosConnectMethod,
  AptosDisconnectFeature,
  AptosDisconnectMethod,
  AptosGetAccountFeature,
  AptosGetAccountMethod,
  AptosGetNetworkFeature,
  AptosGetNetworkMethod,
  AptosSignAndSubmitTransactionFeature,
  AptosSignAndSubmitTransactionMethod,
  AptosSignMessageFeature,
  AptosSignMessageMethod,
  AptosSignTransactionFeature,
  AptosSignTransactionMethod,
  StandardEventsFeature,
  StandardEventsOnMethod,
  WalletWithFeatures,
} from '@aptos-labs/wallet-standard';

export type IWalletAdapter = WalletWithFeatures<
  AptosConnectFeature &
    AptosGetAccountFeature &
    AptosGetNetworkFeature &
    StandardEventsFeature &
    AptosSignAndSubmitTransactionFeature &
    AptosSignTransactionFeature &
    AptosSignMessageFeature &
    Partial<AptosDisconnectFeature>
> & {
  hasFeature: (name: string) => boolean;
  connect: AptosConnectMethod;
  on: StandardEventsOnMethod;
  disconnect: AptosDisconnectMethod;
  network: AptosGetNetworkMethod;
  account: AptosGetAccountMethod;
  signAndSubmitTransaction: AptosSignAndSubmitTransactionMethod;
  signTransaction: AptosSignTransactionMethod;
  signMessage: AptosSignMessageMethod;
};
