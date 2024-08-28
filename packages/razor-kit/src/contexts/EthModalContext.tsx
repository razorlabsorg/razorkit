import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useAccount, useAccountEffect, useConfig } from 'wagmi';
import { useConnectionStatus } from '../hooks/useConnectionStatus';
import { EthAccountModal } from '../components/EthAccountModal';
import { ChainModal } from '../components/EthChainModal/ChainModal';
import { ConnectModal } from '../components/EthConnectModal/ConnectModal';
import { useEthAuthenticationStatus } from './EthAuthenticationContext';

function useEthModalStateValue() {
  const [isModalOpen, setModalOpen] = useState(false);

  return {
    closeModal: useCallback(() => setModalOpen(false), []),
    isModalOpen,
    openModal: useCallback(() => setModalOpen(true), []),
  };
}

interface EthModalContextValue {
  accountModalOpen: boolean;
  chainModalOpen: boolean;
  connectModalOpen: boolean;
  openAccountModal?: () => void;
  openChainModal?: () => void;
  openConnectModal?: () => void;
  isWalletConnectModalOpen: boolean;
  setIsWalletConnectModalOpen: (isWalletConnectModalOpen: boolean) => void;
}

const EthModalContext = createContext<EthModalContextValue>({
  accountModalOpen: false,
  chainModalOpen: false,
  connectModalOpen: false,
  isWalletConnectModalOpen: false,
  setIsWalletConnectModalOpen: () => {},
});

interface EthModalProviderProps {
  children: ReactNode;
}

export function EthModalProvider({ children }: EthModalProviderProps) {
  const {
    closeModal: closeConnectModal,
    isModalOpen: connectModalOpen,
    openModal: openConnectModal,
  } = useEthModalStateValue();

  const {
    closeModal: closeAccountModal,
    isModalOpen: accountModalOpen,
    openModal: openAccountModal,
  } = useEthModalStateValue();

  const {
    closeModal: closeChainModal,
    isModalOpen: chainModalOpen,
    openModal: openChainModal,
  } = useEthModalStateValue();

  const [isWalletConnectModalOpen, setIsWalletConnectModalOpen] =
    useState(false);

  const connectionStatus = useConnectionStatus();

  const { chainId } = useAccount();
  const { chains } = useConfig();

  const isCurrentChainSupported = chains.some((chain) => chain.id === chainId);

  interface CloseModalsOptions {
    keepConnectModalOpen?: boolean;
  }

  function closeModals({
    keepConnectModalOpen = false,
  }: CloseModalsOptions = {}) {
    if (!keepConnectModalOpen) {
      closeConnectModal();
    }
    closeAccountModal();
    closeChainModal();
  }

  const isUnauthenticated = useEthAuthenticationStatus() === 'unauthenticated';

  useAccountEffect({
    onConnect: () => closeModals({ keepConnectModalOpen: isUnauthenticated }),
    onDisconnect: () => closeModals(),
  });

  useEffect(() => {
    // Due to multiple connection feature in wagmi v2 we need to close
    // modals when user is unauthenticated. When connectors changes we log user out
    // This means we'll need to close the modals as well.
    if (isUnauthenticated) closeModals();
  }, [isUnauthenticated]);

  return (
    <EthModalContext.Provider
      value={useMemo(
        () => ({
          accountModalOpen,
          chainModalOpen,
          connectModalOpen,
          isWalletConnectModalOpen,
          openAccountModal:
            isCurrentChainSupported && connectionStatus === 'connected'
              ? openAccountModal
              : undefined,
          openChainModal:
            connectionStatus === 'connected' ? openChainModal : undefined,
          openConnectModal:
            connectionStatus === 'disconnected' ||
            connectionStatus === 'unauthenticated'
              ? openConnectModal
              : undefined,
          setIsWalletConnectModalOpen,
        }),
        [
          connectionStatus,
          accountModalOpen,
          chainModalOpen,
          connectModalOpen,
          openAccountModal,
          openChainModal,
          openConnectModal,
          isCurrentChainSupported,
          isWalletConnectModalOpen,
        ],
      )}
    >
      {children}
      <ConnectModal onClose={closeConnectModal} open={connectModalOpen} />
      <EthAccountModal onClose={closeAccountModal} open={accountModalOpen} />
      <ChainModal onClose={closeChainModal} open={chainModalOpen} />
    </EthModalContext.Provider>
  );
}

export function useModalState() {
  const { accountModalOpen, chainModalOpen, connectModalOpen } =
    useContext(EthModalContext);

  return {
    accountModalOpen,
    chainModalOpen,
    connectModalOpen,
  };
}

export function useAccountModal() {
  const { accountModalOpen, openAccountModal } = useContext(EthModalContext);
  return { accountModalOpen, openAccountModal };
}

export function useChainModal() {
  const { chainModalOpen, openChainModal } = useContext(EthModalContext);
  return { chainModalOpen, openChainModal };
}

export function useWalletConnectOpenState() {
  const { isWalletConnectModalOpen, setIsWalletConnectModalOpen } =
    useContext(EthModalContext);

  return { isWalletConnectModalOpen, setIsWalletConnectModalOpen };
}

export function useConnectModal() {
  const { connectModalOpen, openConnectModal } = useContext(EthModalContext);
  const { isWalletConnectModalOpen } = useWalletConnectOpenState();

  return {
    connectModalOpen: connectModalOpen || isWalletConnectModalOpen,
    openConnectModal,
  };
}
