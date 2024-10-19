import {
  StandardConnectFeature,
  StandardConnectMethod,
  StandardDisconnectFeature,
  StandardDisconnectMethod,
  StandardEventsFeature,
  StandardEventsOnMethod,
  SuiSignAndExecuteTransactionBlockFeature,
  SuiSignAndExecuteTransactionBlockMethod,
  SuiSignMessageFeature,
  SuiSignMessageMethod,
  SuiSignTransactionBlockFeature,
  SuiSignTransactionBlockMethod,
  WalletWithFeatures,
  SuiSignPersonalMessageFeature,
  SuiSignPersonalMessageMethod,
  SuiSignAndExecuteTransactionFeature,
  SuiSignTransactionFeature,
  SuiSignTransactionMethod,
  SuiSignAndExecuteTransactionMethod,
} from '@mysten/wallet-standard';

export type ISuiWalletAdapter = WalletWithFeatures<
  StandardConnectFeature &
    StandardEventsFeature &
    SuiSignAndExecuteTransactionBlockFeature &
    SuiSignAndExecuteTransactionFeature &
    SuiSignTransactionBlockFeature &
    SuiSignTransactionFeature &
    SuiSignMessageFeature &
    SuiSignPersonalMessageFeature &
    Partial<StandardDisconnectFeature>
> & {
  hasFeature: (name: string) => boolean;
  connect: StandardConnectMethod;
  disconnect: StandardDisconnectMethod;
  on: StandardEventsOnMethod;
  signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod;
  signAndExecuteTransaction: SuiSignAndExecuteTransactionMethod;
  signTransaction: SuiSignTransactionMethod;
  signTransactionBlock: SuiSignTransactionBlockMethod;
  signPersonalMessage: SuiSignPersonalMessageMethod;
  /**
   * @deprecated use signPersonalMessage instead
   */
  signMessage: SuiSignMessageMethod;
};
