import { useCallback, useEffect } from 'react';
import { isMobile } from '../utils/isMobile';
import { isNotNullish } from '../utils/isNotNullish';
import { useWalletConnectors } from '../wallets/useWalletConnectors';
import { loadImages } from '../components/AsyncImage/useAsyncImage';
import { preloadAssetsIcon } from '../components/Icons/Assets';
import { preloadLoginIcon } from '../components/Icons/Login';
import { useEthAuthenticationStatus } from '../contexts/EthAuthenticationContext';
import { signInIcon } from '../components/SignIn/SignIn';
import { useRazorKitEthChains } from '../contexts/RazorKitEthChainContext';

export function usePreloadImages() {
  const rainbowKitChains = useRazorKitEthChains();
  const walletConnectors = useWalletConnectors();
  const isUnauthenticated = useEthAuthenticationStatus() === 'unauthenticated';

  const preloadImages = useCallback(() => {
    loadImages(
      ...walletConnectors.map((wallet) => wallet.iconUrl),
      ...rainbowKitChains.map((chain) => chain.iconUrl).filter(isNotNullish),
    );

    // Preload illustrations used on desktop
    if (!isMobile()) {
      preloadAssetsIcon();
      preloadLoginIcon();
    }

    if (isUnauthenticated) {
      loadImages(signInIcon);
    }
  }, [walletConnectors, rainbowKitChains, isUnauthenticated]);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);
}
