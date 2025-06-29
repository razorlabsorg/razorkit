/* eslint-disable @typescript-eslint/ban-ts-comment */
import razorLogo from './assets/logo.png';
import './App.css';
import {
  ConnectButton,
  useAccountBalance,
  useWallet,
  ErrorCode,
  formatCurrency,
} from '@razorlabs/razorkit';
import { InputEntryFunctionData } from '@aptos-labs/ts-sdk';
import { useEffect } from 'react';
import { inMSafeWallet } from '@msafe/aptos-aip62-wallet';


function App() {
  const { connected, connecting, allAvailableWallets, account, signMessage, signAndSubmitTransaction, select, adapter, chain } = useWallet();
  const { balance } = useAccountBalance();

  console.log('available wallets', allAvailableWallets);

  function uint8arrayToHex(value: Uint8Array | undefined) {
    if (!value) return '';
    // @ts-ignore
    return value.toString('hex');
  }

  async function handleSignMsg() {
    if (!account) return;
    try {
      const msg = 'Hello world!.';
      const result = await signMessage({
        message: msg,
        nonce: '0',
      });
      console.log('verify signedMessage', result);
      if (!result.status) {
        alert(`signMessage succeed, but verify signedMessage failed`);
      } else {
        alert(`signMessage succeed, and verify signedMessage succeed!`);
      }
    } catch (e) {
      console.error('signMessage failed', e);
      alert('signMessage failed (see response in the console)');
    }
  }

  async function handleSignTransaction() {
    if (!account) return;

    try {
      const recipient = '0xfaded96b72a03b2ed9e2b2dc0bef0642d63e07fd7b1eeeac047188eb1ef34dd6'
 
      const payload: InputEntryFunctionData = {
        function: '0x1::aptos_account::transfer',
        functionArguments: [recipient, 100000000],
        typeArguments: [],
      };

      const result = await signAndSubmitTransaction({
        payload: payload
      });

      if (result.status === 'Approved') {
        alert(`signTransaction succeed, hash: ${result.args.hash}`);
      } else {
        alert('signTransaction failed');
      }
    } catch (e) {
      console.error('signTransaction failed', e);
    }
  }

  const getWalletStatus = () => {
    if (connecting) return 'connecting';
    return connected ? 'connected' : 'disconnected';
  };

  // write a function that waits until allAvailableWallets is populated before
  

  useEffect(() => {
    let pollInterval: NodeJS.Timeout | undefined;
    
    function waitForAllAvailableWallets() {
      // Clear any existing interval
      if (pollInterval) {
        clearInterval(pollInterval);
      }
      
      // Set up polling that repeatedly checks if MSafe is available
      pollInterval = setInterval(() => {
        console.log("Polling for MSafe wallet, available wallets:", allAvailableWallets.length);
        if (allAvailableWallets.length > 0) {
          // Found wallets, try to select MSafe
          clearInterval(pollInterval);
          const msafeWallet = allAvailableWallets.find(wallet => wallet.name === 'MSafe');
          if (msafeWallet) {
            console.log("MSafe wallet found, selecting...");
            select('MSafe');
          } else {
            console.log("Wallets available but MSafe not found");
          }
        }
      }, 1000); // Check every second
    }

    if (!connected && inMSafeWallet()) {
      // Start polling for wallet availability
      waitForAllAvailableWallets();
    }

    // Clean up the interval when component unmounts or dependencies change
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [connected, select, allAvailableWallets]);

  const isMsafeInjected = inMSafeWallet();
  console.log('isMsafeInjected', isMsafeInjected);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://github.com/razorlabsorg/razorkit" target="_blank">
          <img src={razorLogo} className="logo" alt="Razor logo" />
        </a>
      </div>
      <h1>Vite + Razor Kit</h1>
      <div className="card">
        <ConnectButton
          style={{
            marginTop: '16px',
            background: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)',
          }}
          onConnectSuccess={(name) => {
            console.log('connect success: ', name);
          }}
          onConnectError={(err) => {
            //@ts-ignore
            if (err.code === ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED) {
              console.warn(
                'user rejected the connection to ' + err.details?.wallet,
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

        {!connected ? (
          <p>Connect DApp with Razor wallet from now!</p>
        ) : (
          <div>
            <div>
              <p>current wallet: {adapter?.name}</p>
              <p>wallet status: {getWalletStatus()}</p>
              <p>wallet address: {account?.address}</p>
              <p>current network: {chain?.name}</p>
              <p>
                wallet balance:{' '}
                {formatCurrency(balance ?? 0, {
                  withAbbr: false,
                  decimals: 8,
                })}{' '}
                MOVE
              </p>
              <p>
                wallet publicKey: {uint8arrayToHex(account?.publicKey ? new Uint8Array(account.publicKey) : undefined)}
              </p>
            </div>
              <div className={'btn-group'} style={{ margin: '8px 0' }}>
                <button onClick={handleSignMsg}>signMessage</button>
              </div>
              <div className={'btn-group'} style={{ margin: '8px 0' }}>
                <button onClick={handleSignTransaction}>signTransaction</button>
              </div>
          </div>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and Razor logos to learn more
      </p>
    </div>
  );
}

export default App;
