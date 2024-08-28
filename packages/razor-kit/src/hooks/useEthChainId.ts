import { useAccount } from 'wagmi';

export function useEthChainId(): number | null {
  const { chain: activeChain } = useAccount();
  return activeChain?.id ?? null;
}
