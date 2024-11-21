import { Aptos, AptosConfig } from '@aptos-labs/ts-sdk';
import { useMemo } from 'react';

export type AptosProvider = Aptos;

export function useAptosProvider(endpoint: string): AptosProvider {
  const provider = useMemo<Aptos>(() => {
    const config = new AptosConfig({ fullnode: endpoint });
    return new Aptos(config);
  }, [endpoint]);

  return provider;
}
