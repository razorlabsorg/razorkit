import { Wallet } from '@mysten/wallet-standard';

/**
 * Checks if the provided wallet is compatible with a standard wallet adapter by verifying specific features.
 *
 * @param {Wallet} wallet - The wallet to be checked for compatibility.
 * @return {boolean} Returns true if the wallet has the required features for a standard wallet adapter, otherwise false.
 */
export function isStandardWalletAdapterCompatibleWallet(wallet: Wallet) {
  return (
    'standard:connect' in wallet.features &&
    'standard:events' in wallet.features &&
    'sui:signAndExecuteTransaction' in wallet.features &&
    'sui:signAndExecuteTransactionBlock' in wallet.features
  );
}
