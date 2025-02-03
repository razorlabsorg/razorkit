import { useChain } from './useChain';

export function useChainId() {
  const chain = useChain();
  return chain?.id;
}
