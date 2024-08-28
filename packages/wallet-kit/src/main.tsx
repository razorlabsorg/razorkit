import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { SuiWalletProvider } from './components';
import { AptosWalletProvider } from './components';
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains';
import { mevmImola } from './chains/ethereum/mevm';
import { getDefaultConfig } from './config/getDefaultConfig'
import { MevmKitProvider } from './components/MevmKitProvider/MevmKitProvider'

export const config = getDefaultConfig({
  appName: 'MevmKit demo',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mevmImola, arbitrum, base, mainnet, optimism, polygon],
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <MevmKitProvider initialChain={mevmImola} showRecentTransactions={true}>
            <SuiWalletProvider>
              <AptosWalletProvider>
                <App />
              </AptosWalletProvider>
            </SuiWalletProvider>
          </MevmKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
