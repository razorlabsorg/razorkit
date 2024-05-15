/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAptosAccountBalance } from '../hooks/useAptosAccountBalance';
import { useAptosWallet } from '../hooks/useAptosWallet';
import React from 'react';
import { ErrorCode, formatAPT } from '@razorlabs/m1-wallet-sdk';
import AptosConnectButton from '../components/Button/AptosConnectButton';

function Aptos() {
  const wallet = useAptosWallet();
  const { balance } = useAptosAccountBalance();

  function getPublicKey() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return wallet.account?.publicKey.toString();
  }

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
            console.warn(
              'user rejected the connection to ' + err.details?.wallet
            );
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
            <p>
              wallet status:{' '}
              {wallet.connecting
                ? 'connecting'
                : wallet.connected
                  ? 'connected'
                  : 'disconnected'}
            </p>
            <p>account address: {wallet.account?.address}</p>
            <p>account publicKey: {getPublicKey() || 'not supported'}</p>
            <p>
              current chain: {wallet.chain?.name} (id: {wallet.chain?.id})
            </p>
            <p>
              MOVE Balance: {formatAPT(balance ?? 0)} (id: {wallet.chain?.id})
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Aptos;
