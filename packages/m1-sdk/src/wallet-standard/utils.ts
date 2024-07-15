import { AptosWallet } from '@aptos-labs/wallet-standard';

export function isStandardWalletAdapterCompatibleWallet(wallet: AptosWallet) {
  return (
    'aptos:connect' in wallet.features &&
    'aptos:signMessage' in wallet.features &&
    'aptos:signAndSubmitTransaction' in wallet.features
  );
}
