import { AptosAccountResourceManager } from './AptosAccountResourceManager';
import { IAptosAccountCoinManager } from './interfaces/IAptosAccountCoinManager';
import { AptosCoinResource } from '../../common/AptosCoinResource';
import { composeType, extractCoinType, isAptosCoin } from '../../utils';
import { CoinStoreResource } from '../../types/coins';
import { Aptos, MoveStructId } from '@aptos-labs/ts-sdk';

export class AptosAccountCoinManager
  extends AptosAccountResourceManager
  implements IAptosAccountCoinManager
{
  private coinType: string;

  constructor(aptosClient: Aptos, coinType: string) {
    super(aptosClient);
    this.coinType = coinType;
  }

  async getOwnedCoins(address: string): Promise<AptosCoinResource[]> {
    const coins: AptosCoinResource[] = [];

    const resp = await this.client.getAccountResources({
      accountAddress: address,
    });

    let i = 0;
    const length = resp.length;

    while (length > 0 && i < length) {
      const resource = resp[i];
      const coinType = extractCoinType(resource.type);
      if (isAptosCoin(resource.type) && coinType === this.coinType) {
        //
        const resourceData = resource.data as CoinStoreResource;
        const balance = BigInt(resourceData.coin.value);
        const coin = new AptosCoinResource(this.coinType, balance);

        coins.push(coin);
      }
      i = i + 1;
    }
    return coins;
  }

  async fetchAccountResource(
    accountAddress: string,
    resourceType: MoveStructId,
    ledgerVersion?: bigint | number,
  ) {
    try {
      const response = await this.client.getAccountResource({
        accountAddress,
        resourceType,
        options: { ledgerVersion: ledgerVersion },
      });
      return response;
    } catch (e: unknown) {
      console.log(e);
      throw e;
    }
  }

  async getBalance(address: string): Promise<bigint> {
    const coinStore = await this.fetchAccountResource(
      address,
      composeType('0x1::coin::CoinStore', [this.coinType]),
    );
    const data = coinStore;
    const balance = BigInt(data.coin.value);
    return balance;
  }
}
