import React, { ReactNode, createContext, useContext, useMemo } from "react";
import { useConfig } from "wagmi";
import type { Chain } from "wagmi/chains";
import { RazorKitEthChain, provideRazorKitEthChains } from "./provideRazorKitEthChains";

interface RazorKitEthChainContextValue {
  chains: RazorKitEthChain[];
  initialChainId?: number;
}
const RazorKitEthChainContext = createContext<RazorKitEthChainContextValue>({
  chains: [],
});

interface RazorKitEthChainProviderProps {
  initialChain?: Chain | number;
  children: ReactNode;
}

export function RazorKitEthChainProvider({
  children,
  initialChain
}: RazorKitEthChainProviderProps) {
  const { chains } = useConfig();

  return (
    <RazorKitEthChainContext.Provider
      value={useMemo(
        () => ({
          chains: provideRazorKitEthChains(chains),
          initialChainId: typeof initialChain === 'number' ? initialChain : initialChain?.id,
        }), [chains, initialChain]
      )}
    >
      {children}
    </RazorKitEthChainContext.Provider>
  )
}

export const useRazorKitEthChains = () => useContext(RazorKitEthChainContext).chains;
export const useInitialChainId = () => useContext(RazorKitEthChainContext).initialChainId;
export const useRazorKitEthChainsById = () => {
  const razorKitEthChains = useRazorKitEthChains();
  return useMemo(() => {
    const razorKitEthChainsById: Record<number, RazorKitEthChain> = {};

    for (const mkChain of razorKitEthChains) {
      razorKitEthChainsById[mkChain.id] = mkChain;
    }

    return razorKitEthChainsById;
  }, [razorKitEthChains])
}