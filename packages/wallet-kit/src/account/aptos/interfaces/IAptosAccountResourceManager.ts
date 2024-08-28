import { Aptos, MoveResource } from "@aptos-labs/ts-sdk";

export interface IAptosAccountResourceManager {
  getOwnedResources(address: string): Promise<MoveResource[]>;
  getAptosClient(): Aptos;
  setAptosClient(aptosClient: Aptos): void;
}
