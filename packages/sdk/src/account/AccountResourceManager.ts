import { Aptos, MoveResource } from '@aptos-labs/ts-sdk';
import { IAccountResourceManager } from './interfaces';

export class AccountResourceManager implements IAccountResourceManager {
  protected client: Aptos;
  constructor(aptosClient: Aptos) {
    this.client = aptosClient;
  }

  async getOwnedResources(address: string): Promise<MoveResource[]> {
    const response = await this.client.getAccountResources({
      accountAddress: address,
    });
    return response;
  }

  getAptosClient(): Aptos {
    return this.client;
  }

  setAptosClient(aptosClient: Aptos) {
    this.client = aptosClient;
  }
}
