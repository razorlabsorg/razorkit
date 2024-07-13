import { AptosClient } from 'aptos';
import { AptosCoinResource } from '../../common/AptosCoinResource';

export interface IAccountCoinManager {
  getOwnedCoins(address: string): Promise<AptosCoinResource[]>;
  getBalance(address: string): Promise<bigint>;
  getAptosClient(): AptosClient;
  setAptosClient(suiClient: AptosClient): void;
}
