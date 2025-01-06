export interface IAccountAssetManager {
  getAptosBalance(): Promise<bigint>;
  getCoinBalance(coinType: string): Promise<bigint>;
  getFaBalance(faAddress: string): Promise<bigint>;
  getAddress(): string;
  setChainUrls(chainRpcUrl: string, indexerUrl: string): void;
  getChainRpcUrl(): string;
  getIndexerUrl(): string | undefined;
}
