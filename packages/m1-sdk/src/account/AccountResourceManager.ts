import { AptosClient, Types } from 'aptos';
import { IAccountResourceManager } from './interfaces';

export class AccountResourceManager implements IAccountResourceManager {
  protected client: AptosClient;
  constructor(aptosClient: AptosClient) {
    this.client = aptosClient;
  }

  async getOwnedResources(address: string): Promise<Types.MoveResource[]> {
    const response = await this.client.getAccountResources(address);
    return response;
  }

  getAptosClient(): AptosClient {
    return this.client;
  }

  setAptosClient(aptosClient: AptosClient) {
    this.client = aptosClient;
  }
}
