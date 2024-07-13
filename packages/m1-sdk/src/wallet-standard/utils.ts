import { AptosWallet } from '@aptos-labs/wallet-standard';

export function isStandardWalletAdapterCompatibleWallet(wallet: AptosWallet) {
  return (
    'aptos:connect' in wallet.features &&
    'standard:events' in wallet.features &&
    'aptos:signAndSubmitTransaction' in wallet.features
  );
}
