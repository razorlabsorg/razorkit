import { IWalletAdapter } from './interfaces';
import {
  ErrorCode,
  handleConnectionError,
  WalletError,
  WalletNotImplementError,
} from '../error-handling';
import { FeatureName } from './constants';
import {
  AptosConnectMethod,
  AptosConnectOutput,
  AptosDisconnectMethod,
  AptosGetAccountMethod,
  AptosGetNetworkMethod,
  AptosSignAndSubmitTransactionInput,
  AptosSignAndSubmitTransactionMethod,
  AptosSignAndSubmitTransactionOutput,
  AptosSignMessageInput,
  AptosSignMessageMethod,
  AptosSignMessageOutput,
  AptosSignTransactionMethod,
  AptosSignTransactionOutput,
  NetworkInfo,
  UserResponse,
  AptosWallet,
  AptosOnAccountChangeMethod,
  AptosOnAccountChangeInput,
  AptosOnNetworkChangeInput,
  AptosOnNetworkChangeMethod,
  AccountInfo,
} from '@aptos-labs/wallet-standard';
import { has } from '../utils';
import { AnyRawTransaction } from '@aptos-labs/ts-sdk';

/**
 * Wrap the adapter that supports wallet-standard
 * provider universal interfaces to component usage
 */
export class WalletAdapter implements IWalletAdapter {
  private standardWalletAdapter: AptosWallet;

  constructor(standardWalletAdapter: AptosWallet) {
    this.standardWalletAdapter = standardWalletAdapter;
  }

  get name(): string {
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
    return this.standardWalletAdapter.features;
  }

  async connect(): Promise<UserResponse<AptosConnectOutput>> {
    const feature = this.getFeature<{ connect: AptosConnectMethod }>(
      FeatureName.APTOS__CONNECT,
    );
    try {
      return await feature.connect();
    } catch (e) {
      const { code, message, details } = handleConnectionError(
        e as Error,
        this.name,
      );
      throw new WalletError(message, code, details);
    }
  }

  async disconnect(): Promise<void> {
    const feature = this.getFeature<{ disconnect: AptosDisconnectMethod }>(
      FeatureName.APTOS__DISCONNECT,
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

  async network(): Promise<NetworkInfo> {
    const feature = this.getFeature<{ network: AptosGetNetworkMethod }>(
      FeatureName.APTOS__NETWORK,
    );
    try {
      return await feature.network();
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__GET_NETWORK_ERROR,
      );
    }
  }

  async account(): Promise<AccountInfo> {
    const feature = this.getFeature<{ account: AptosGetAccountMethod }>(
      FeatureName.APTOS__ACCOUNT,
    );
    try {
      return await feature.account();
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__GET_ACCOUNT_ERROR,
      );
    }
  }

  async onAccountChange(input: AptosOnAccountChangeInput): Promise<void> {
    const feature = this.getFeature<{
      onAccountChange: AptosOnAccountChangeMethod;
    }>(FeatureName.APTOS__ON_ACCOUNT_CHANGE);
    try {
      return await feature.onAccountChange(input);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__ON_ACCOUNT_CHANGE_ERROR,
      );
    }
  }

  async onNetworkChange(input: AptosOnNetworkChangeInput): Promise<void> {
    const feature = this.getFeature<{
      onNetworkChange: AptosOnNetworkChangeMethod;
    }>(FeatureName.APTOS__ON_NETWORK_CHANGE);
    try {
      return await feature.onNetworkChange(input);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__ON_NETWORK_CHANGE_ERROR,
      );
    }
  }

  async signAndSubmitTransaction(
    input: AptosSignAndSubmitTransactionInput,
  ): Promise<UserResponse<AptosSignAndSubmitTransactionOutput>> {
    const feature = this.getFeature<{
      signAndSubmitTransaction: AptosSignAndSubmitTransactionMethod;
    }>(FeatureName.APTOS__SIGN_AND_SUBMIT_TRANSACTION);
    try {
      return await feature.signAndSubmitTransaction(input);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__SIGN_TX_ERROR,
      );
    }
  }

  async signTransaction(
    transaction: AnyRawTransaction,
    asFeePayer?: boolean,
  ): Promise<UserResponse<AptosSignTransactionOutput>> {
    const feature = this.getFeature<{
      signTransaction: AptosSignTransactionMethod;
    }>(FeatureName.APTOS__SIGN_TRANSACTION);
    try {
      return feature.signTransaction(transaction, asFeePayer);
    } catch (e) {
      throw new WalletError(
        (e as any).message,
        ErrorCode.WALLET__SIGN_TX_ERROR,
      );
    }
  }

  async signMessage(
    input: AptosSignMessageInput,
  ): Promise<UserResponse<AptosSignMessageOutput>> {
    const feature = this.getFeature<{ signMessage: AptosSignMessageMethod }>(
      FeatureName.APTOS__SIGN_MESSAGE,
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

  hasFeature(name: string): boolean {
    const { features } = this.standardWalletAdapter;
    return has(features, name);
  }

  private getFeature<T = any>(name: string): T {
    const { features } = this.standardWalletAdapter;
    if (!has(features, name)) {
      throw new WalletNotImplementError(name);
    }
    return (features as any)[name];
  }
}
