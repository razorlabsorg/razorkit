/* eslint-disable @typescript-eslint/no-explicit-any */
import { Wallet } from '@razorlabs/wallet-standard';

export function isNonEmptyArray(value: any): boolean {
  return Array.isArray(value) && value.length > 0;
}

export function isStandardSuiWalletAdapterCompatibleWallet(wallet: Wallet) {
  return (
    'standard:connect' in wallet.features &&
    'standard:events' in wallet.features &&
    'sui:signAndExecuteTransactionBlock' in wallet.features
  );
}

export function isStandardAptosWalletAdapterCompatibleWallet(wallet: Wallet) {
  return (
    'aptos:connect' in wallet.features &&
    'standard:events' in wallet.features &&
    'aptos:signAndSubmitTransaction' in wallet.features
  );
}
