/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAccountBalance } from '../hooks/useAccountBalance';
import { useWallet } from '../hooks/useWallet';
import React from 'react';
import { ErrorCode, formatNativeCurrency } from '@razorlabs/wallet-sdk';
import AptosConnectButton from '../components/Button/ConnectButton';

const Home: React.FC = () => {
  const wallet = useWallet();
  const { balance } = useAccountBalance();

  function getPublicKey() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return wallet.account?.publicKey.toString();
  }

  const getWalletStatus = () => {
    if (wallet.connecting) return 'connecting';
    return wallet.connected ? 'connected' : 'disconnected';
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AptosConnectButton
        className={'aaa'}
        style={{ marginTop: '16px' }}
        onConnectSuccess={(name) => {
          console.log('connect success: ', name);
        }}
        onConnectError={(err) => {
          if (err.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
            console.warn('user rejected the connection to ' + err.details?.wallet);
          } else {
            console.warn('unknown connect error: ', err);
          }
        }}
        onDisconnectSuccess={(name) => {
          console.log('disconnect success: ', name);
        }}
        onDisconnectError={(err) => {
          console.log('disconnect error: ', err);
        }}
      />

      {!wallet.connected ? (
        <p
          style={{
            color: 'black',
          }}
        >
          Connect DApp with Razor wallet from now!
        </p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p>current wallet: {wallet.adapter?.name}</p>
            <p>wallet status: {getWalletStatus()}</p>
            <p>account address: {wallet.account?.address}</p>
            <p>account publicKey: {getPublicKey() ?? 'not supported'}</p>
            <p>
              current chain: {wallet.chain?.name} (id: {wallet.chain?.id})
            </p>
            <p>
              MOVE Balance: {formatNativeCurrency(balance ?? 0)} (id: {wallet.chain?.id})
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
