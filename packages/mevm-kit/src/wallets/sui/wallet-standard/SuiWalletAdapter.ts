import {
  StandardConnectOutput,
  StandardEventsListeners,
  StandardEventsNames,
  StandardConnectInput,
  StandardConnectMethod,
  StandardDisconnectMethod,
  StandardEventsOnMethod,
  Wallet,
  SuiSignTransactionBlockInput,
  SuiSignAndExecuteTransactionBlockInput,
  SuiSignAndExecuteTransactionBlockOutput,
  SuiSignAndExecuteTransactionBlockMethod,
  SuiSignTransactionBlockMethod,
  SuiSignTransactionBlockOutput,
  SuiSignMessageInput,
  SuiSignMessageOutput,
  SuiSignMessageMethod,
  SuiSignPersonalMessageMethod,
  SuiSignPersonalMessageInput,
  SuiSignPersonalMessageOutput,
  SuiSignAndExecuteTransactionInput,
  SuiSignAndExecuteTransactionOutput,
  SuiSignAndExecuteTransactionMethod,
  SuiSignTransactionInput,
  SignedTransaction,
  SuiSignTransactionMethod,
} from '@mysten/wallet-standard';
import { ISuiWalletAdapter } from './interfaces';
import {
  ErrorCode,
  handleSuiConnectionError,
  WalletError,
  WalletNotImplementError,
} from '../../../error-handling';
import { FeatureName } from './constants';
import { has } from '../../../utils/check/has';

export class SuiWalletAdapter implements ISuiWalletAdapter {
  private standardWalletAdapter: Wallet;

  constructor(standardWalletAdapter: Wallet) {
    this.standardWalletAdapter = standardWalletAdapter;
  }

  get name() {
    return this.standardWalletAdapter.name;
  }

  get icon() {
    return this.standardWalletAdapter.icon;
  }

  get version() {
    return this.standardWalletAdapter.version;
  }

  get accounts() {
    return this.standardWalletAdapter.accounts;
  }

  get chains() {
    return this.standardWalletAdapter.chains;
  }

  get features() {
    return this.standardWalletAdapter.features as any;
  }

  async connect(
    input: StandardConnectInput | undefined,
  ): Promise<StandardConnectOutput> {
    const feature = this.getFeature<{ connect: StandardConnectMethod }>(
      FeatureName.STANDARD__CONNECT,
    );
    try {
      return await feature.connect(input);
    } catch (e) {
      const { code, message, details } = handleSuiConnectionError(
        e as Error,
        this.name,
      );
      throw new WalletError(message, code, details);
    }
  }

  async disconnect(): Promise<void> {
    const feature = this.getFeature<{ disconnect: StandardDisconnectMethod }>(
      FeatureName.STANDARD__DISCONNECT,
    );
    try {
      return await feature.disconnect();
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__DISCONNECT_ERROR,
      );
    }
  }

  on(
    event: StandardEventsNames,
    listener: StandardEventsListeners[StandardEventsNames],
  ): () => void {
    const feature = this.getFeature<{ on: StandardEventsOnMethod }>(
      FeatureName.STANDARD__EVENTS,
    );
    try {
      return feature.on<StandardEventsNames>(event, listener);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__LISTEN_TO_EVENT_ERROR,
      );
    }
  }

  async signAndExecuteTransactionBlock(
    input: SuiSignAndExecuteTransactionBlockInput,
  ): Promise<SuiSignAndExecuteTransactionBlockOutput> {
    const feature = this.getFeature<{
      signAndExecuteTransactionBlock: SuiSignAndExecuteTransactionBlockMethod;
    }>(FeatureName.SUI__SIGN_AND_EXECUTE_TRANSACTION_BLOCK);
    try {
      return await feature.signAndExecuteTransactionBlock(input);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__SIGN_TX_ERROR,
      );
    }
  }

  async signAndExecuteTransaction(
    input: SuiSignAndExecuteTransactionInput,
  ): Promise<SuiSignAndExecuteTransactionOutput> {
    const feature = this.getFeature<{
      signAndExecuteTransaction: SuiSignAndExecuteTransactionMethod;
    }>(FeatureName.SUI__SIGN_AND_EXECUTE_TRANSACTION);
    try {
      return await feature.signAndExecuteTransaction(input);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__SIGN_TX_ERROR,
      );
    }
  }

  signTransactionBlock(
    input: SuiSignTransactionBlockInput,
  ): Promise<SuiSignTransactionBlockOutput> {
    const feature = this.getFeature<{
      signTransactionBlock: SuiSignTransactionBlockMethod;
    }>(FeatureName.SUI__SIGN_TRANSACTION_BLOCK);
    try {
      return feature.signTransactionBlock(input);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__SIGN_TX_ERROR,
      );
    }
  }

  signTransaction(input: SuiSignTransactionInput): Promise<SignedTransaction> {
    const feature = this.getFeature<{
      signTransaction: SuiSignTransactionMethod;
    }>(FeatureName.SUI__SIGN_TRANSACTION);
    try {
      return feature.signTransaction(input);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__SIGN_TX_ERROR,
      );
    }
  }

  async signMessage(input: SuiSignMessageInput): Promise<SuiSignMessageOutput> {
    const feature = this.getFeature<{ signMessage: SuiSignMessageMethod }>(
      FeatureName.SUI__SIGN_MESSAGE,
    );
    try {
      return await feature.signMessage(input);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__SIGN_MSG_ERROR,
      );
    }
  }

  signPersonalMessage(
    input: SuiSignPersonalMessageInput,
  ): Promise<SuiSignPersonalMessageOutput> {
    const feature = this.getFeature<{
      signPersonalMessage: SuiSignPersonalMessageMethod;
    }>(FeatureName.SUI__SIGN_PERSONAL_MESSAGE);
    try {
      return feature.signPersonalMessage(input);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__SIGN_PERSONAL_MSG_ERROR,
      );
    }
  }

  hasFeature(name: string): boolean {
    const { features } = this.standardWalletAdapter;
    return has(features, name);
  }

  /**
   * Retrieves a specific feature by name from the standard wallet adapter.
   *
   * @param {string} name - The name of the feature to retrieve.
   * @return {T} The retrieved feature.
   */
  private getFeature<T = any>(name: string): T {
    const { features } = this.standardWalletAdapter;
    if (!has(features, name)) {
      throw new WalletNotImplementError(name);
    }
    return (features as any)[name];
  }
}
