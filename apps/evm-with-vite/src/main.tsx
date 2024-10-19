import './global.css';
import '@razorlabs/razorkit/styles.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { getDefaultConfig, mevmImola, RazorKitEthProvider } from '@razorlabs/razorkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const config = getDefaultConfig({
  appName: 'RazorKit Vite MEVM demo',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mevmImola],
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RazorKitEthProvider>
          <App />
        </RazorKitEthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
)
