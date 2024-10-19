/**
 * Interface for managing assets (coins and SUI) of an account.
 *
 * @interface ISuiAccountAssetManager
 */
export interface ISuiAccountAssetManager {
  /**
   * Get the balance of SUI in the account.
   *
   * @returns {Promise<bigint>} The balance of SUI in the account.
   */
  getSuiBalance(): Promise<bigint>;

  /**
   * Get the balance of a specific coin type in the account.
   *
   * @param {string} coinType - The type of coin to get the balance of.
   * @returns {Promise<bigint>} The balance of the specified coin type in the account.
   */
  getCoinBalance(coinType: string): Promise<bigint>;

  /**
   * Get the address of the account.
   *
   * @returns {string} The address of the account.
   */
  getAddress(): string;

  /**
   * Set the RPC URL of the chain.
   *
   * @param {string} chainRpcUrl - The RPC URL of the chain.
   */
  setChainRpcUrl(chainRpcUrl: string): void;

  /**
   * Get the RPC URL of the chain.
   *
   * @returns {string} The RPC URL of the chain.
   */
  getChainRpcUrl(): string;
}
