import { ISuiAccountObjectManager } from './interfaces';
import {
  SuiClient,
  SuiObjectData,
} from '@mysten/sui/client';

export class SuiAccountObjectManager implements ISuiAccountObjectManager {
  protected client: SuiClient;

  /**
   * Constructor for AccountObjectManager class.
   *
   * @param {SuiClient} suiClient - The SuiClient instance.
   */
  constructor(suiClient: SuiClient) {
    this.client = suiClient;
  }

  async getOwnedObjects(address: string): Promise<SuiObjectData[]> {
    let hasNextPage = true;
    let nextCursor = null;
    const objects: SuiObjectData[] = [];
    while (hasNextPage) {
      const resp = await this.client.getOwnedObjects({
        owner: address,
        cursor: nextCursor,
        options: {
          showType: true,
          showDisplay: true,
          showContent: true,
          showOwner: true,
        },
      });
      const sui_object_responses = resp.data;

      sui_object_responses?.forEach((res) => {
        const obj = res.data;
        if (obj) {
          objects.push(obj);
        }
      });
      hasNextPage = resp.hasNextPage;
      nextCursor = resp.nextCursor;
    }
    return objects;
  }

  getSuiClient(): SuiClient {
    return this.client;
  }
  setSuiClient(suiClient: SuiClient) {
    this.client = suiClient;
  }
}
