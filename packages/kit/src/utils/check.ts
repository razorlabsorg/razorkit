/* eslint-disable @typescript-eslint/no-explicit-any */
import { Wallet } from '@aptos-labs/wallet-standard';

export function isNonEmptyArray(value: any): boolean {
  return Array.isArray(value) && value.length > 0;
}

export function isStandardAptosWalletAdapterCompatibleWallet(wallet: Wallet) {
  return (
    'aptos:connect' in wallet.features &&
    'aptos:disconnect' in wallet.features &&
    'aptos:signMessage' in wallet.features &&
    'aptos:signAndSubmitTransaction' in wallet.features
  );
}
