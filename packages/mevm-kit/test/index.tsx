import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderResult } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { http, type Chain } from 'viem';
import { WagmiProvider, createConfig } from 'wagmi';
import {
  arbitrum,
  avalanche,
  base,
  bsc,
  mainnet,
  optimism,
  polygon,
  zora,
} from 'wagmi/chains';
import { mock } from 'wagmi/connectors';
import { WalletList } from '../src/wallets/Wallet';
import { connectorsForWallets } from '../src/wallets/connectorsForWallets';
import { mockedAccounts } from './mockWallet';
import { RazorKitEthProvider, RazorKitEthProviderProps } from '../src/components/RazorKitEthProvider';

const defaultChains: readonly [Chain, ...Chain[]] = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  bsc,
  avalanche,
  zora,
];

const queryClient = new QueryClient();
// @ts-ignore
export function renderWithProviders(
  component: ReactElement,
  options?: {
    chains?: readonly [Chain, ...Chain[]];
    mockWallets?: WalletList;
    props?: Omit<RazorKitEthProviderProps, 'children'>;
  },
): RenderResult {
  const supportedChains = options?.chains || defaultChains;

  const config = createConfig({
    chains: supportedChains,
    connectors: options?.mockWallets
      ? connectorsForWallets(options.mockWallets, {
          appName: 'rainbowkit.com',
          projectId: process.env.WALLETCONNECT_PROJECT_ID ?? 'YOUR_PROJECT_ID',
        })
      : [
          mock({
            accounts: mockedAccounts,
          }),
        ],
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [optimism.id]: http(),
      [arbitrum.id]: http(),
      [base.id]: http(),
      [bsc.id]: http(),
      [avalanche.id]: http(),
      [zora.id]: http(),
    },
  });

  return render(component, {
    wrapper: ({ children }) => (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RazorKitEthProvider {...options?.props}>
            {children}
          </RazorKitEthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    ),
  });
}
