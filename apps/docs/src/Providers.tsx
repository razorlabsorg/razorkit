import { getDefaultConfig, mevmImola } from "@razorlabs/razorkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

type ProviderProps = {
  children: React.ReactNode;
}

const client = new QueryClient();

const config = getDefaultConfig({
  appName: 'RazorKit Docs',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mevmImola],
});

const Providers: React.FC<React.PropsWithChildren<ProviderProps>> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
} 

export default Providers