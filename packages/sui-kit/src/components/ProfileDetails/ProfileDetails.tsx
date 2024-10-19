import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { User, Copy, CheckCircle, LogOut } from 'lucide-react';
import React from 'react';

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 12px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Name = styled.h2`
  margin: 0;
  font-size: 20px;
  color: #333;
`;

const Balance = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #666;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #eee;
  }

  svg {
    margin-right: 10px;
  }
`;

interface ProfileDetailsProps {
  address: string;
  ensName?: string;
  ensAvatar?: string;
  balance?: { formatted: string; symbol: string };
  onClose: () => void;
  onDisconnect: () => void;
}

export function ProfileDetails({
  address,
  ensName,
  ensAvatar,
  balance,
  onClose,
  onDisconnect,
}: ProfileDetailsProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const accountName = ensName || `${address.slice(0, 6)}...${address.slice(-4)}`;
  const displayBalance = balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : 'Balance unavailable';

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
  };

  useEffect(() => {
    if (copiedAddress) {
      const timer = setTimeout(() => setCopiedAddress(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [copiedAddress]);

  return (
    <Container>
      <Header>
        <Avatar>
          {ensAvatar ? (
            <img src={ensAvatar} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          ) : (
            <User size={40} color="#666" />
          )}
        </Avatar>
        <Name>{accountName}</Name>
        <Balance>{displayBalance}</Balance>
      </Header>
      <ActionButton onClick={copyAddress}>
        {copiedAddress ? <CheckCircle size={20} /> : <Copy size={20} />}
        {copiedAddress ? 'Copied!' : 'Copy Address'}
      </ActionButton>
      <ActionButton onClick={onDisconnect}>
        <LogOut size={20} />
        Disconnect
      </ActionButton>
      <ActionButton onClick={onClose}>Close</ActionButton>
    </Container>
  );
}