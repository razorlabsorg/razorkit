import { IAccountAssetManager } from './interfaces';
import { SuiClient } from '@mysten/sui/client';
import { AccountCoinManager } from './AccountCoinManager';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';

export class AccountAssetManager implements IAccountAssetManager {
  private address: string;
  private chainRpcUrl: string;
  private suiClient: SuiClient;

  /**
   * Constructs a new instance of the AccountAssetManager class.
   *
   * @param {string} address - The address of the account.
   * @param {object} options - The options for the account asset manager.
   * @param {string} options.chainRpcUrl - The URL of the chain RPC.
   */
  constructor(
    address: string,
    options: {
      chainRpcUrl: string;
    },
  ) {
    this.address = address;
    this.chainRpcUrl = options.chainRpcUrl;
    this.suiClient = new SuiClient({
      url: options.chainRpcUrl,
    });
  }

  getAddress(): string {
    return this.address;
  }

  getCoinBalance(coinType: string): Promise<bigint> {
    const coinManager = new AccountCoinManager(this.suiClient, coinType);
    return coinManager.getBalance(this.address);
  }

  getSuiBalance(): Promise<bigint> {
    return this.getCoinBalance(SUI_TYPE_ARG);
  }

  getChainRpcUrl(): string {
    return this.chainRpcUrl;
  }

  setChainRpcUrl(chainRpcUrl: string): void {
    this.chainRpcUrl = chainRpcUrl;
    this.suiClient = new SuiClient({
      url: chainRpcUrl,
    });
  }
}
