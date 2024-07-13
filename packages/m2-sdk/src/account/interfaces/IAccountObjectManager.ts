import { SuiClient, SuiObjectData } from '@mysten/sui.js/client';

/**
 * Interface for managing objects of an account.
 *
 * @interface IAccountObjectManager
 */
export interface IAccountObjectManager {
  /**
   * Get all objects owned by the account.
   *
   * @param {string} address - The address of the account.
   * @returns {Promise<SuiObjectData[]>} - Promise that resolves to an array of owned objects.
   */
  getOwnedObjects(address: string): Promise<SuiObjectData[]>;

  /**
   * Get the SuiClient instance.
   *
   * @returns {SuiClient} - The SuiClient instance.
   */
  getSuiClient(): SuiClient;

  /**
   * Set the SuiClient instance.
   *
   * @param {SuiClient} suiClient - The SuiClient instance to set.
   */
  setSuiClient(suiClient: SuiClient): void;
}
