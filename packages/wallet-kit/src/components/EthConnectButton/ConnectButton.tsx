import { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAccount, useConfig } from 'wagmi';
// import { useIsMounted } from '../../hooks/useIsMounted';
import { useProfile } from '../../hooks/useProfile';
import { useRecentTransactions } from '../../utils/transactions/useRecentTransactions';
import { useAccountModal, useChainModal, useConnectModal } from '../MevmKitProvider/ModalContext';
import { useMevmKitChainsById } from '../MevmKitProvider/MevmKitChainContext';
import { abbreviateETHBalance } from './abbreviateETHBalance';
import { formatAddress } from './formatAddress';
import { ChevronDown } from 'lucide-react';
import React from 'react';

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { opacity: 0.8; }
  color: #333; /* Added dark text color */
`;

const ChainButton = styled(Button)<{ $unsupported?: boolean }>`
  background-color: ${props => props.$unsupported ? '#FFA500' : '#f0f0f0'};
  color: ${props => props.$unsupported ? 'white' : '#333'}; /* Updated for dark text */
  margin-right: 8px;
`;

const AccountButton = styled(Button)`
  background-color: #e0e0e0;
  color: #333; /* Added dark text color */
`;

const ConnectButtonItem = styled(Button)`
  background-color: #3498db;
  color: #333; /* Changed to dark text color */
`;

interface ConnectButtonRendererProps {
  children: (renderProps: {
    account?: {
      address: string;
      displayName: string;
      displayBalance?: string;
      ensAvatar?: string;
      hasPendingTransactions: boolean;
    };
    chain?: {
      id: number;
      name?: string;
      unsupported?: boolean;
    };
    openAccountModal: () => void;
    openChainModal: () => void;
    openConnectModal: () => void;
  }) => ReactNode;
}

function ConnectButtonRenderer({ children }: ConnectButtonRendererProps) {
  // const isMounted = useIsMounted();
  const { address, chainId } = useAccount();
  const { chains } = useConfig();
  const mevmKitChainsById = useMevmKitChainsById();

  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();

  const { balance, ensAvatar, ensName } = useProfile({ address, includeBalance:true });
  const recentTransactions = useRecentTransactions();

  const chain = chainId ? mevmKitChainsById[chainId] : undefined;
  const unsupportedChain = chain && !chains.some(c => c.id === chainId);

  const displayBalance = balance
    ? `${abbreviateETHBalance(parseFloat(balance.formatted))} ${balance.symbol}`
    : undefined;

  return children({
    account: address
      ? {
          address,
          displayName: ensName ? ensName : formatAddress(address),
          displayBalance,
          ensAvatar: ensAvatar ?? undefined,
          hasPendingTransactions: recentTransactions.some(tx => tx.status === 'pending'),
        }
      : undefined,
    chain: chainId
      ? {
          id: chainId,
          name: chain?.name,
          unsupported: unsupportedChain,
        }
      : undefined,
    openAccountModal: openAccountModal ?? (() => {}),
    openChainModal: openChainModal ?? (() => {}),
    openConnectModal: openConnectModal ?? (() => {}),
  });
}

interface ConnectButtonProps {
  label?: string;
}

function ConnectButton({ label = 'Connect Wallet' }: ConnectButtonProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <ConnectButtonRenderer>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {chain && (
            <ChainButton onClick={openChainModal} $unsupported={chain.unsupported}>
              {chain.unsupported ? 'Unsupported' : chain.name}
              <ChevronDown size={16} style={{ marginLeft: '4px' }} />
            </ChainButton>
          )}
          {account ? (
            <AccountButton onClick={openAccountModal}>
              {account.displayBalance && <span style={{ marginRight: '8px' }}>{account.displayBalance}</span>}
              {account.displayName}
              <ChevronDown size={16} style={{ marginLeft: '4px' }} />
            </AccountButton>
          ) : (
            <ConnectButtonItem onClick={openConnectModal}>{label}</ConnectButtonItem>
          )}
        </div>
      )}
    </ConnectButtonRenderer>
  );
}

ConnectButton.Custom = ConnectButtonRenderer;

export { ConnectButton, ConnectButtonRenderer };