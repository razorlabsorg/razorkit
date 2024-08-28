import React, { ReactNode } from 'react';
import { useAccountEffect } from 'wagmi';
import type { Chain } from 'wagmi/chains';
import { TransactionStoreProvider } from '../../utils/transactions/TransactionStoreContext';
import { AppContext, DisclaimerComponent, defaultAppInfo } from './AppContext';
import { ModalProvider } from './ModalContext';
import { MevmKitChainProvider } from './MevmKitChainContext';
import { ShowBalanceProvider } from './ShowBalanceContext';
import { ShowRecentTransactionsContext } from './ShowRecentTransactionsContext';
import { WalletButtonProvider } from './WalletButtonContext';
import { clearWalletConnectDeepLink } from './walletConnectDeepLink';

export interface MevmKitProviderProps {
  initialChain?: Chain | number;
  children: ReactNode;
  showRecentTransactions?: boolean;
  appInfo?: {
    appName?: string;
    learnMoreUrl?: string;
    disclaimer?: DisclaimerComponent;
  };
}

export function MevmKitProvider({
  appInfo,
  children,
  initialChain,
  showRecentTransactions = false,
}: MevmKitProviderProps) {
  useAccountEffect({ onDisconnect: clearWalletConnectDeepLink });

  const appContext = {
    ...defaultAppInfo,
    ...appInfo,
  };

  return (
    <MevmKitChainProvider initialChain={initialChain}>
      <WalletButtonProvider>
        <ShowRecentTransactionsContext.Provider value={showRecentTransactions}>
          <TransactionStoreProvider>
            <AppContext.Provider value={appContext}>
              <ShowBalanceProvider>
                <ModalProvider>
                  {children}
                </ModalProvider>
              </ShowBalanceProvider>
            </AppContext.Provider>
          </TransactionStoreProvider>
        </ShowRecentTransactionsContext.Provider>
      </WalletButtonProvider>
    </MevmKitChainProvider>
  );
}