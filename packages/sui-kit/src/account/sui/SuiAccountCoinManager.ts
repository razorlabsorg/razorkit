import { ISuiAccountCoinManager } from './interfaces';
import { SuiCoinObject } from '../../common';
import { SuiClient, PaginatedCoins } from '@mysten/sui/client';
import { SuiAccountObjectManager } from './SuiAccountObjectManager';

export class SuiAccountCoinManager
  extends SuiAccountObjectManager
  implements ISuiAccountCoinManager
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

  async getOwnedCoins(address: string): Promise<SuiCoinObject[]> {
    let hasNextPage = true;
    let nextCursor = null;
    const coins: SuiCoinObject[] = [];
    while (hasNextPage) {
      const paginatedCoins: PaginatedCoins = await this.client.getCoins({
        owner: address,
        coinType: this.coinType,
        cursor: nextCursor,
      });
      paginatedCoins.data.forEach((coin) => {
        coins.push(
          new SuiCoinObject(
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
