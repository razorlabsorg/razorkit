import React, { ReactNode, createContext, useContext, useMemo } from "react";
import { useConfig } from "wagmi";
import type { Chain } from "wagmi/chains";
import { MevmKitChain, provideMevmKitChains } from "./provideMevmKitChains";

interface MevmKitChainContextValue {
  chains: MevmKitChain[];
  initialChainId?: number;
}
const MevmKitChainContext = createContext<MevmKitChainContextValue>({
  chains: [],
});

interface MevmKitChainProviderProps {
  initialChain?: Chain | number;
  children: ReactNode;
}

export function MevmKitChainProvider({
  children,
  initialChain
}: MevmKitChainProviderProps) {
  const { chains } = useConfig();

  return (
    <MevmKitChainContext.Provider
      value={useMemo(
        () => ({
          chains: provideMevmKitChains(chains),
          initialChainId: typeof initialChain === 'number' ? initialChain : initialChain?.id,
        }), [chains, initialChain]
      )}
    >
      {children}
    </MevmKitChainContext.Provider>
  )
}

export const useMevmKitChains = () => useContext(MevmKitChainContext).chains;
export const useInitialChainId = () => useContext(MevmKitChainContext).initialChainId;
export const useMevmKitChainsById = () => {
  const mevmKitChains = useMevmKitChains();
  return useMemo(() => {
    const mevmKitChainsById: Record<number, MevmKitChain> = {};

    for (const mkChain of mevmKitChains) {
      mevmKitChainsById[mkChain.id] = mkChain;
    }

    return mevmKitChainsById;
  }, [mevmKitChains])
}