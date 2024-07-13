import { IAccountCoinManager } from './interfaces';
import { CoinObject } from '../common';
import { SuiClient, PaginatedCoins } from '@mysten/sui.js/client';
import { AccountObjectManager } from './AccountObjectManager';

export class AccountCoinManager
  extends AccountObjectManager
  implements IAccountCoinManager
{
  private coinType: string;

  /**
   * Constructor for AccountCoinManager class.
   *
   * @param {SuiClient} suiClient - The SuiClient instance.
   * @param {string} coinType - The type of the coin.
   */
  constructor(suiClient: SuiClient, coinType: string) {
    super(suiClient);
    this.coinType = coinType;
  }

  async getOwnedCoins(address: string): Promise<CoinObject[]> {
    let hasNextPage = true;
    let nextCursor = null;
    let coins: CoinObject[] = [];
    while (hasNextPage) {
      const paginatedCoins: PaginatedCoins = await this.client.getCoins({
        owner: address,
        coinType: this.coinType,
        cursor: nextCursor,
      });
      paginatedCoins.data.forEach((coin) => {
        coins.push(
          new CoinObject(
            coin.coinObjectId,
            coin.coinType,
            BigInt(coin.balance),
          ),
        );
      });
      hasNextPage = paginatedCoins.hasNextPage;
      nextCursor = paginatedCoins.nextCursor;
    }
    return coins;
  }

  async getBalance(address: string): Promise<bigint> {
    const res = await this.client.getBalance({
      owner: address,
      coinType: this.coinType,
    });
    return BigInt(res.totalBalance);
  }
}
