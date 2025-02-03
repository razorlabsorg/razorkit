import { Aptos } from '@aptos-labs/ts-sdk';
import { useQuery } from '@tanstack/react-query';
import { useProvider } from './useProvider';
import { useChain } from './useChain';

export async function fetchAbi(
  address: string,
  moduleName: string,
  client: Aptos,
) {
  const module = await client.getAccountModule({
    accountAddress: address,
    moduleName: moduleName,
  });

  const abi = module.abi;

  return abi;
}

export function useAbi(address: string, moduleName: string) {
  const chain = useChain();
  const client = useProvider(chain?.rpcUrl!, chain?.indexerUrl);

  const { data } = useQuery({
    queryKey: ['abi', address, moduleName],
    queryFn: () => fetchAbi(address, moduleName, client),
    enabled: !!address && !!moduleName,
    retry: 5,
  });

  return data;
}
