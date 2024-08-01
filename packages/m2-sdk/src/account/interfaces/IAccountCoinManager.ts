import { SuiClient } from '@mysten/sui/client';
import { CoinObject } from '../../common';

/**
 * Interface for managing coins of an account.
 * @interface IAccountCoinManager
 */
export interface IAccountCoinManager {
  /**
   * Get the coin objects of one specific token type.
   * @param {string} address - The address of the account.
   * @returns {Promise<CoinObject[]>} - Promise that resolves to an array of coin objects.
   */
  getOwnedCoins(address: string): Promise<CoinObject[]>;

  /**
   * Get the balance of a specific coin type in the account.
   * @param {string} address - The address of the account.
   * @returns {Promise<bigint>} - Promise that resolves to the balance of the specified coin type in the account.
   */
  getBalance(address: string): Promise<bigint>;

  /**
   * Get the SuiClient instance.
   * @returns {SuiClient} - The SuiClient instance.
   */
  getSuiClient(): SuiClient;

  /**
   * Set the SuiClient instance.
   * @param {SuiClient} suiClient - The SuiClient instance to set.
   */
  setSuiClient(suiClient: SuiClient): void;
}
