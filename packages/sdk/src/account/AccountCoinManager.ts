import { AccountResourceManager } from './AccountResourceManager';
import { FaBalance, IAccountCoinManager } from './interfaces/IAccountCoinManager';
import { CoinResource } from '../common/CoinResource';
import { composeType, extractCoinType, isAptosCoin, standardizeAddress } from '../utils';
import { CoinStoreResource } from '../types/coins';
import { Aptos, MoveStructId } from '@aptos-labs/ts-sdk';

const COINS_QUERY = `
    query CoinsData($owner_address: String, $limit: Int, $offset: Int) {
        current_fungible_asset_balances(
            where: {owner_address: {_eq: $owner_address}}
            limit: $limit
            offset: $offset
        ) {
            amount
            asset_type
            metadata {
                name
                decimals
                symbol
                token_standard
            }
        }
    }
`;

const COIN_COUNT_QUERY = `
    query GetFungibleAssetCount($address: String) {
        current_fungible_asset_balances_aggregate(
            where: {owner_address: {_eq: $address}}
            order_by: {amount: desc}
        ) {
            aggregate {
                count
            }
        }
    }
`;

export class AccountCoinManager extends AccountResourceManager implements IAccountCoinManager {
  constructor(aptosClient: Aptos) {
    super(aptosClient);
  }

  async getOwnedCoins(address: string, coinTypeAddress: string): Promise<CoinResource[]> {
    const coins: CoinResource[] = [];

    const resp = await this.client.getAccountResources({
      accountAddress: address,
    });

    let i = 0;
    const length = resp.length;

    while (length > 0 && i < length) {
      const resource = resp[i];
      const coinType = extractCoinType(resource.type);
      if (isAptosCoin(resource.type) && coinType === coinTypeAddress) {
        //
        const resourceData = resource.data as CoinStoreResource;
        const balance = BigInt(resourceData.coin.value);
        const coin = new CoinResource(coinTypeAddress, balance);

        coins.push(coin);
      }
      i = i + 1;
    }
    return coins;
  }

  async getOwnedFungibleAssets(address: string): Promise<FaBalance[]> {
    const PAGE_SIZE = 100;
    const standardizedAddress = standardizeAddress(address);

    const countResp = await this.client.queryIndexer<{
      current_fungible_asset_balances_aggregate: { aggregate: { count: number } };
    }>({
      query: {
        query: COIN_COUNT_QUERY,
        variables: {
          address: standardizedAddress,
        },
      },
    });

    const faCount = countResp.current_fungible_asset_balances_aggregate.aggregate.count;

    const fetchFungibleAssets = async (): Promise<FaBalance[]> => {
      if (!faCount) {
        return [];
      }

      const promises = [];
      for (let i = 0; i < faCount; i += PAGE_SIZE) {
        promises.push(
          this.client.queryIndexer<{
            current_fungible_asset_balances: FaBalance[];
          }>({
            query: {
              query: COINS_QUERY,
              variables: {
                owner_address: standardizedAddress,
                limit: PAGE_SIZE,
                offset: i,
              },
            },
          }),
        );
      }

      const responses = await Promise.all(promises);
      return responses.flatMap((r) => r.current_fungible_asset_balances);
    };

    return fetchFungibleAssets();
  }

  async fetchAccountResource(accountAddress: string, resourceType: MoveStructId, ledgerVersion?: bigint | number) {
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

  async getBalance({
    address,
    coinType,
    faAddress,
  }: {
    address: string;
    coinType?: string;
    faAddress?: string;
  }): Promise<bigint> {
    if (coinType) {
      const getPairedCoinType = async (): Promise<string | null> => {
        const viewResp = await this.client.view({
          payload: {
            function: '0x1::coin::paired_metadata',
            typeArguments: [],
            functionArguments: [coinType],
          },
        });

        const data = viewResp[0];

        if (data !== undefined) {
          const mappedData = data as [{ vec: [{ inner: string }] }];
          const val = mappedData[0]?.vec[0];
          if (val !== undefined && val !== null) {
            return val.inner;
          }
        }

        return null;
      };

      const pairedCoinType = await getPairedCoinType();

      if (!pairedCoinType) {
        const coinStore = await this.fetchAccountResource(address, composeType('0x1::coin::CoinStore', [coinType]));
        const data = coinStore;
        const balance = BigInt(data.coin.value);
        return balance;
      } else {
        const coinStore = await this.fetchAccountResource(address, composeType('0x1::coin::CoinStore', [coinType]));
        const coinData = coinStore;
        const coinBalance = BigInt(coinData.coin.value);

        const pairedCoinStore = await this.client.getAccountCoinAmount({
          accountAddress: address,
          faMetadataAddress: pairedCoinType,
        });

        const pairedCoinBalance = BigInt(pairedCoinStore);

        return coinBalance + pairedCoinBalance;
      }
    } else {
      const fas = await this.client.getAccountCoinAmount({
        accountAddress: address,
        faMetadataAddress: faAddress,
      });
      return BigInt(fas);
    }
  }
}
