import { AptosClient, Types } from 'aptos';

export interface IAccountResourceManager {
  getOwnedResources(address: string): Promise<Types.MoveResource[]>;
  getAptosClient(): AptosClient;
  setAptosClient(aptosClient: AptosClient): void;
}
