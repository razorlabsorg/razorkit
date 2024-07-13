import { IAccountAssetManager } from './interfaces/IAccountAssetManager';
import { AccountCoinManager } from './AccountCoinManager';
import { AptosClient } from 'aptos';

export class AccountAssetManager implements IAccountAssetManager {
  private address: string;
  private chainRpcUrl: string;
  private aptosClient: AptosClient;

  constructor(
    address: string,
    options: {
      chainRpcUrl: string;
    }
  ) {
    this.address = address;
    this.chainRpcUrl = options.chainRpcUrl;
    this.aptosClient = new AptosClient(options.chainRpcUrl);
  }

  getAddress(): string {
    return this.address;
  }

  getCoinBalance(coinType: string): Promise<bigint> {
    const coinManager = new AccountCoinManager(this.aptosClient, coinType);
    return coinManager.getBalance(this.address);
  }

  getAptosBalance(): Promise<bigint> {
    return this.getCoinBalance('0x1::aptos_coin::AptosCoin');
  }

  getChainRpcUrl(): string {
    return this.chainRpcUrl;
  }

  setChainRpcUrl(chainRpcUrl: string): void {
    this.chainRpcUrl = chainRpcUrl;
    this.aptosClient = new AptosClient(chainRpcUrl);
  }
}
