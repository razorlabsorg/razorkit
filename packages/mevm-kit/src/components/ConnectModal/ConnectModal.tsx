import React, { useCallback, useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import {  useDisconnect } from 'wagmi';
import { X } from 'lucide-react';
import { useWalletConnectors, WalletConnector } from '../../wallets/useWalletConnectors';
import { groupBy } from '../../utils/groupBy';
import { addLatestWalletId } from '../../wallets/latestWalletId';
import { WalletButtonContext } from '../MevmKitProvider/WalletButtonContext';
import { Wallet } from '../../wallets/Wallet';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  color: #333;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 16px;
  text-align: center;
  color: #333;
`;

const WalletList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const WalletOption = styled.button`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: #f0f0f0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const WalletIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

const WalletName = styled.span`
  font-size: 16px;
  color: #333;
`;

const GroupName = styled.h3`
  margin-top: 16px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
`;

interface AsyncChainIconProps {
  iconUrl: Wallet['iconUrl'];
  name: string;
}

interface ConnectModalProps {
  open: boolean;
  onClose: () => void;
}

export function ConnectModal({ onClose, open }: ConnectModalProps) {
  const { disconnect } = useDisconnect();
  const { connector: activeConnector } = useContext(WalletButtonContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selectedWallet, setSelectedWallet] = useState<WalletConnector | null>(null);

  const wallets = useWalletConnectors();
  const groupedWallets = groupBy(wallets, (wallet) => wallet.groupName);

  const onConnectModalCancel = useCallback(() => {
    if (activeConnector?.isConnecting) disconnect();
    onClose();
  }, [onClose, disconnect, activeConnector]);

  const selectWallet = async (wallet: WalletConnector) => {
    setSelectedWallet(wallet);
    addLatestWalletId(wallet.id);

    if (wallet.ready) {
      wallet.connect?.().catch((error) => {
        // Handle error if needed
          if (error.code === 4001) {
            console.log("User rejected the request")
          } else if (error.code === -32002) {
            console.log("Request already pending")
          } else if (error.message && error.message.includes("user rejected")) {
            console.log("User rejected the connection")
          } else if (error.message && error.message.includes("already processing")) {
            console.log("Connection already in progress")
          } else {
            console.error("An unexpected error occurred:", error)
          }
          // You might want to update the UI or state here to reflect the error
          setSelectedWallet(null)

      });
    }
  };

  if (!open) return null;

  const AsyncWalletIcon = ({ iconUrl, name }: AsyncChainIconProps) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      if (typeof iconUrl === 'function') {
        const src = await iconUrl();
        setImageSrc(src);
      } else if (typeof iconUrl === 'string') {
        setImageSrc(iconUrl);
      }
    };

    loadImage();
  }, [iconUrl]);

  if (!imageSrc) return null;

  return <WalletIcon src={imageSrc} alt={name} />;
};

  return (
    <ModalOverlay onClick={onConnectModalCancel}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onConnectModalCancel}>
          <X size={24} />
        </CloseButton>
        <Title>Connect a Wallet</Title>
        {Object.entries(groupedWallets).map(([groupName, wallets]) => (
          <React.Fragment key={groupName}>
            {groupName && <GroupName>{groupName}</GroupName>}
            <WalletList>
              {wallets.map((wallet) => (
                <WalletOption
                  key={wallet.id}
                  onClick={() => selectWallet(wallet)}
                  disabled={!wallet.ready}
                >
                  <AsyncWalletIcon iconUrl={wallet.iconUrl} name={`${wallet.name} icon`} />
                  <WalletName>
                    {wallet.name}
                    {!wallet.ready && ' (not ready)'}
                  </WalletName>
                </WalletOption>
              ))}
            </WalletList>
          </React.Fragment>
        ))}
      </ModalContent>
    </ModalOverlay>
  );
}