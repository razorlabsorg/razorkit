import { Address } from "viem";
import { useBalance } from "wagmi";

interface UseEthProfileParameters {
  address?: Address;
  includeBalance?: boolean;
}

export function useEthProfile({ address, includeBalance }: UseEthProfileParameters) {
  const { data: balance } = useBalance({
    address: includeBalance ? address : undefined,
  });

  return { balance, ensAvatar: undefined, ensName: undefined };
}
