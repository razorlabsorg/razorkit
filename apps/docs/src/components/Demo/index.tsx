import { Box } from 'components/Box';
import { walletButtons } from './index.css';
import useLocale from 'hooks/useLocale';
import { Locale, RazorKitEthProvider, WalletButton as RKWalletButton } from '@razorlabs/razorkit';

export function WalletButtonDemo() {
  const { locale } = useLocale() as { locale: Locale };
  return (
    <RazorKitEthProvider locale={locale}>
      <Box className={walletButtons} id="wallet-button-demo">
        <Box alignItems={'flex-start'}>
          <RKWalletButton wallet="rainbow" />
        </Box>
        <Box>
          <RKWalletButton wallet="metaMask" />
        </Box>
        <Box>
          <RKWalletButton wallet="coinbase" />
        </Box>
        <Box>
          <RKWalletButton wallet="trust" />
        </Box>
        <Box>
          <RKWalletButton wallet="argent" />
        </Box>
        <Box>
          <RKWalletButton wallet="omni" />
        </Box>
      </Box>
    </RazorKitEthProvider>
  );
}
