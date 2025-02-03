import { IAccountAssetManager } from './interfaces/IAccountAssetManager';
import { AccountCoinManager } from './AccountCoinManager';
import { AccountAddress, Aptos, AptosConfig } from '@aptos-labs/ts-sdk';

export class AccountAssetManager implements IAccountAssetManager {
  readonly address: string;
  private chainRpcUrl: string;
  private indexerUrl?: string;
  private aptosClient: Aptos;

  constructor(
    address: string,
    options: {
      chainRpcUrl: string;
      indexerUrl?: string;
    },
  ) {
    const config = new AptosConfig({
      fullnode: options.chainRpcUrl,
      indexer: options.indexerUrl,
    });
    this.address = address;
    this.chainRpcUrl = options.chainRpcUrl;
    this.indexerUrl = options.indexerUrl;
    this.aptosClient = new Aptos(config);
  }

  getAddress(): string {
    return this.address;
  }

  getCoinBalance(coinType: string): Promise<bigint> {
    const coinManager = new AccountCoinManager(this.aptosClient);
    return coinManager.getBalance({
      address: this.address,
      coinType,
    });
  }

  getFaBalance(faAddress: string): Promise<bigint> {
    const coinManager = new AccountCoinManager(this.aptosClient);
    return coinManager.getBalance({
      address: this.address,
      faAddress,
    });
  }

  async getAptosBalance(): Promise<bigint> {
    const aptosCoinType = '0x1::aptos_coin::AptosCoin';
    const aptosFaAddress = AccountAddress.A.toStringLong();
    const aptosCoinBalance = await this.getCoinBalance(aptosCoinType);
    const aptosFaBalance = await this.getFaBalance(aptosFaAddress);
    return aptosCoinBalance + aptosFaBalance;
  }

  getChainRpcUrl(): string {
    return this.chainRpcUrl;
  }

  getIndexerUrl(): string | undefined {
    return this.indexerUrl;
  }

  setChainUrls(chainRpcUrl: string, indexerUrl: string): void {
    this.chainRpcUrl = chainRpcUrl;
    this.indexerUrl = indexerUrl;
    const config = new AptosConfig({
      fullnode: chainRpcUrl,
      indexer: indexerUrl,
    });
    this.aptosClient = new Aptos(config);
  }
}
