import { Aptos } from '@aptos-labs/ts-sdk';
import { CoinResource } from '../../common/CoinResource';

export type FaBalance = {
  amount: number;
  asset_type: string;
  metadata: {
    name: string;
    decimals: number;
    symbol: string;
    token_standard: string;
  };
};

export interface IAccountCoinManager {
  getOwnedCoins(address: string, coinType: string): Promise<CoinResource[]>;
  getOwnedFungibleAssets(address: string): Promise<FaBalance[]>;
  getBalance({
    address,
    coinType,
    faAddress,
  }: {
    address: string;
    coinType?: string;
    faAddress?: string;
  }): Promise<bigint>;
  getAptosClient(): Aptos;
  setAptosClient(client: Aptos): void;
}
