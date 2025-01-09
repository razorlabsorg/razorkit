import '../styles/globals.css';
import '@razorlabs/razorkit/style.css';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletProvider } from '@razorlabs/razorkit';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WalletProvider>
  );
}

export default MyApp;
