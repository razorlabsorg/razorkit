import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@razorlabs/razorkit/styles.css';
import { BrowserRouter } from 'react-router-dom';
// import { SuiWalletProvider } from './components';
// import { AptosWalletProvider } from './components';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { arbitrum, base, mainnet, optimism, polygon } from 'wagmi/chains';
// import { getDefaultConfig } from './config/getDefaultConfig';
import { SuiWalletProvider } from '@razorlabs/sui-kit';
import { AptosWalletProvider } from '@razorlabs/aptos-kit';

import '@razorlabs/sui-kit/style.css';
import {
  getDefaultConfig,
  mevmImola,
  RazorKitEthProvider,
} from '@razorlabs/razorkit';

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
          <RazorKitEthProvider
            initialChain={mevmImola}
            showRecentTransactions={true}
          >
            <SuiWalletProvider>
              <AptosWalletProvider>
                <App />
              </AptosWalletProvider>
            </SuiWalletProvider>
          </RazorKitEthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
