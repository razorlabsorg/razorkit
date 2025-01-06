import { Aptos, AptosConfig } from '@aptos-labs/ts-sdk';
import { useMemo } from 'react';

export type Provider = Aptos;

export function useProvider(rpcUrl: string, indexer?: string): Provider {
  const provider = useMemo<Provider>(() => {
    const config = new AptosConfig({ fullnode: rpcUrl, indexer });
    return new Aptos(config);
  }, [rpcUrl, indexer]);

  return provider;
}
