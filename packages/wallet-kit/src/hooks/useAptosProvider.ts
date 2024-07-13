import { AptosClient } from 'aptos';
import { useMemo } from 'react';

export type AptosProvider = AptosClient;

export function useAptosProvider(endpoint: string): AptosProvider {
  return useMemo<AptosClient>(() => new AptosClient(endpoint), [endpoint]);
}
