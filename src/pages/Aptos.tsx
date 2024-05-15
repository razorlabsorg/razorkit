/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAptosAccountBalance } from '../hooks/useAptosAccountBalance';
import { useAptosWallet } from '../hooks/useAptosWallet';
import React from 'react';
import { ErrorCode, formatAPT } from '@razorlabs/m1-wallet-sdk';
import AptosConnectButton from '../components/Button/AptosConnectButton';

/* const sampleNft = new Map([
  [
    'movement:m2:devnet',
    '0x2f60e33e33a1c880e8749073c5ef89288cf4df8974d8b872dfd72bc6c58f1172::nft::mint',
  ],
]); */

function Aptos() {
  const wallet = useAptosWallet();
  const { balance } = useAptosAccountBalance();

  /* async function handleExecuteMoveCall(target: string | undefined) {
    if (!target) return;
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: target as any,
        arguments: [
          tx.pure('Razor NFT'),
          tx.pure('Razor Sample NFT'),
          tx.pure(
            'https://ipfs.io/ipfs/QmYbAuxRGdSgNsfDopufzRrXsXfeuRsMnd1T1JR7qdi5Kn'
          ),
        ],
      });
      const resData = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log('executeMoveCall success', resData);
      alert('executeMoveCall succeeded (see response in the console)');
    } catch (e) {
      console.error('executeMoveCall failed', e);
      alert('executeMoveCall failed (see response in the console)');
    }
  } */

  /* async function handleSignPersonalMessage() {
    if (!wallet.account) return;

    try {
      const msg = 'Hello world!';
      const result = await wallet.signPersonalMessage({
        message: new TextEncoder().encode(msg),
      });
      const isValid = await wallet.verifySignedMessage(
        result,
        wallet.account.publicKey
      );
      console.log('verify signedMessage', isValid);
      alert('signMessage succeeded (see response in the console)');
    } catch (e) {
      console.error('signMessage failed', e);
      alert('signMessage failed (see response in the console)');
    }
  } */

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
          {/* <div style={{ margin: '8px 0' }}>
            <button
              onClick={() =>
                handleExecuteMoveCall(sampleNft.get('movement:m2:devnet'))
              }
            >
              Devnet Mint NFT
            </button>
            <button
              style={{ marginLeft: '8px' }}
              onClick={handleSignPersonalMessage}
            >
              signMessage
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default Aptos;
