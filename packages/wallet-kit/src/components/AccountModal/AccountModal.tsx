import React from 'react';
import styled from 'styled-components';
import * as Dialog from '@radix-ui/react-dialog';
import { useAccount, useDisconnect } from 'wagmi';
import { useProfile } from '../../hooks/useProfile';
import { User, Wallet, X } from 'lucide-react';
import { abbreviateETHBalance } from '../EthConnectButton/abbreviateETHBalance';

const StyledOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
`;

const StyledContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  font-family: Arial, sans-serif;
  color: #333; /* Added dark text color */
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  margin-right: 16px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileInfo = styled.div`
  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #333; /* Added dark text color */
  }
  p {
    margin: 5px 0 0;
    font-size: 14px;
    color: #333; /* Changed to dark text color */
  }
`;

const BalanceSection = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333; /* Added dark text color */
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
  color: #333; /* Added dark text color */

  &:hover {
    opacity: 0.9;
  }
`;

const CloseButton = styled(Button)`
  background-color: white;
  border: 1px solid #ccc;
`;

const DisconnectButton = styled(Button)`
  background-color: #ff4d4f;
  color: white;
  border: none;
`;

const CloseIcon = styled(Dialog.Close)`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

export interface AccountModalProps {
  open: boolean;
  onClose: () => void;
}

export function AccountModal({ onClose, open }: AccountModalProps) {
  const { address } = useAccount();
  const { balance, ensAvatar, ensName } = useProfile({
    address,
    includeBalance: open,
  });
  const { disconnect } = useDisconnect();

  const displayBalance = balance
    ? `${abbreviateETHBalance(parseFloat(balance.formatted))} ${balance.symbol}`
    : undefined;

  if (!address) {
    return null;
  }

  return (
    <Dialog.Root open={open} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <Dialog.Title className="sr-only">Account Details</Dialog.Title>
          <CloseIcon asChild>
            <button aria-label="Close">
              <X size={24} />
            </button>
          </CloseIcon>
          
          <ProfileSection>
            <Avatar>
              {ensAvatar ? (
                <img src={ensAvatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <User size={32} color="#333" />
              )}
            </Avatar>
            <ProfileInfo>
              <h2>{ensName || 'Ethereum Account'}</h2>
              <p>{`${address.slice(0, 6)}...${address.slice(-4)}`}</p>
            </ProfileInfo>
          </ProfileSection>
          
          <BalanceSection>
            <Wallet size={20} color="#333" />
            <span style={{ fontWeight: 'bold' }}>Balance:</span>
            <span>{balance ? `${displayBalance}` : 'Loading...'}</span>
          </BalanceSection>
          
          <ButtonSection>
            <CloseButton onClick={onClose}>
              Close
            </CloseButton>
            <DisconnectButton onClick={() => {
              disconnect();
              onClose();
            }}>
              Disconnect
            </DisconnectButton>
          </ButtonSection>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}