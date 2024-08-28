import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi';
import { X, LogOut } from 'lucide-react';
import { useMevmKitChains } from '../MevmKitProvider/MevmKitChainContext';
import { MevmKitChain } from '../MevmKitProvider/provideMevmKitChains';
import React from 'react';

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
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  color: black;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: black;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 16px;
  color: black;
`;

const ChainList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ChainButton = styled.button<{ isselected: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: ${props => props.isselected ? '#f0f0f0' : 'white'};
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: black;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ChainIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 12px;
  border-radius: 50%;
`;

const DisconnectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  margin-top: 16px;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ff7875;
  }
`;

interface AsyncChainIconProps {
  iconUrl: MevmKitChain['iconUrl'];
  name: string;
}

interface ChainModalProps {
  open: boolean;
  onClose: () => void;
}

const AsyncChainIcon = ({ iconUrl, name }: AsyncChainIconProps) => {
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

  return <ChainIcon src={imageSrc} alt={name} />;
};

export function ChainModal({ onClose, open }: ChainModalProps) {
  const { chainId } = useAccount();
  const chains = useMevmKitChains();
  const [pendingChainId, setPendingChainId] = useState<number | null>(null);
  const { switchChain } = useSwitchChain({
    mutation: {
      onMutate: ({ chainId: _chainId }) => {
        setPendingChainId(_chainId);
      },
      onSettled: () => {
        setPendingChainId(null);
        onClose();
      },
    },
  });

  const { disconnect } = useDisconnect();

  if (!open || !chainId) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <X size={24} />
        </CloseButton>
        <Title>Select a network</Title>
        <ChainList>
          {chains.map((chain) => (
            <ChainButton
              key={chain.id}
              isselected={chain.id === chainId}
              onClick={() => switchChain({ chainId: chain.id })}
              disabled={chain.id === pendingChainId}
            >
              {chain.iconUrl && <AsyncChainIcon iconUrl={chain.iconUrl} name={chain.name} />}
              {chain.name}
              {chain.id === chainId && " (Connected)"}
              {chain.id === pendingChainId && " (Connecting...)"}
            </ChainButton>
          ))}
        </ChainList>
        <DisconnectButton onClick={() => { disconnect(); onClose(); }}>
          <LogOut size={20} style={{ marginRight: '8px' }} />
          Disconnect
        </DisconnectButton>
      </ModalContent>
    </ModalOverlay>
  );
}