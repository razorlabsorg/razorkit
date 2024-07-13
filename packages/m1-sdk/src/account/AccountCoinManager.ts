import { AptosClient } from 'aptos';
import { AccountResourceManager } from './AccountResourceManager';
import { IAccountCoinManager } from './interfaces/IAccountCoinManager';
import { AptosCoinResource } from '../common/AptosCoinResource';
import { composeType, extractCoinType, isAptosCoin } from '../utils';
import { AptosResource, CoinStoreResource } from '../types/coins';

export class AccountCoinManager
  extends AccountResourceManager
  implements IAccountCoinManager
{
  private coinType: string;

  constructor(aptosClient: AptosClient, coinType: string) {
    super(aptosClient);
    this.coinType = coinType;
  }

  async getOwnedCoins(address: string): Promise<AptosCoinResource[]> {
    const coins: AptosCoinResource[] = [];

    const resp = await this.client.getAccountResources(address);

    let i = 0;
    const length = resp?.length;

    while (length! > 0 && i < length!) {
      const resource = resp![i];
      const coinType = extractCoinType(resource?.type!);
      if (isAptosCoin(resource?.type!) && coinType === this.coinType) {
        //
        const resourceData = resource?.data as CoinStoreResource;
        const balance = BigInt(resourceData.coin.value);
        const coin = new AptosCoinResource(this.coinType, balance);

        coins.push(coin);
      }
      i = i + 1;
    }
    return coins;
  }

  async fetchAccountResource<T = unknown>(
    accountAddress: string,
    resourceType: string,
    ledgerVersion?: bigint | number,
  ): Promise<AptosResource<T> | undefined> {
    try {
      const response = await this.client.getAccountResource(
        accountAddress,
        resourceType,
        { ledgerVersion: ledgerVersion },
      );
      return response as unknown as AptosResource<T>;
    } catch (e: unknown) {
      console.log(e);
      throw e;
    }
  }

  async getBalance(address: string): Promise<bigint> {
    const coinStore = await this.fetchAccountResource<CoinStoreResource>(
      address,
      composeType('0x1::coin::CoinStore', [this.coinType]),
    );
    const data = coinStore?.data;
    const balance = BigInt(data?.coin.value!);
    return balance;
  }
}
