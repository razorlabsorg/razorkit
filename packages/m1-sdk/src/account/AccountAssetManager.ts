import { IAccountAssetManager } from './interfaces/IAccountAssetManager';
import { AccountCoinManager } from './AccountCoinManager';
import { Aptos, AptosConfig } from '@aptos-labs/ts-sdk';

export class AccountAssetManager implements IAccountAssetManager {
  private address: string;
  private chainRpcUrl: string;
  private aptosClient: Aptos;

  constructor(
    address: string,
    options: {
      chainRpcUrl: string;
    },
  ) {
    const config = new AptosConfig({ fullnode: options.chainRpcUrl });
    this.address = address;
    this.chainRpcUrl = options.chainRpcUrl;
    this.aptosClient = new Aptos(config);
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
    const config = new AptosConfig({ fullnode: chainRpcUrl });
    this.aptosClient = new Aptos(config);
  }
}
