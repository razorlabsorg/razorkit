/* eslint-disable @typescript-eslint/ban-ts-comment */
import razorLogo from './assets/logo.png';
import './App.css';
import {
  ConnectButton,
  useAccountBalance,
  useWallet,
  ErrorCode,
  formatCurrency,
  useAccount,
} from '@razorlabs/razorkit';
import { InputEntryFunctionData } from '@aptos-labs/ts-sdk';

function App() {
  const wallet = useWallet();
  const account = useAccount();
  const { balance } = useAccountBalance();

  function uint8arrayToHex(value: Uint8Array | undefined) {
    if (!value) return '';
    // @ts-ignore
    return value.toString('hex');
  }

  async function handleSignMsg() {
    if (!wallet.account) return;
    try {
      const msg = 'Hello world!.';
      const result = await wallet.signMessage({
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
    if (!wallet.account) return;

    try {
      const recipient = '0xfaded96b72a03b2ed9e2b2dc0bef0642d63e07fd7b1eeeac047188eb1ef34dd6'
 
      const payload: InputEntryFunctionData = {
        function: '0x1::aptos_account::transfer',
        functionArguments: [recipient, 100000000],
        typeArguments: [],
      };

      const result = await wallet.signAndSubmitTransaction({
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
    if (wallet.connecting) return 'connecting';
    return wallet.connected ? 'connected' : 'disconnected';
  };

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

        {!wallet.connected ? (
          <p>Connect DApp with Razor wallet from now!</p>
        ) : (
          <div>
            <div>
              <p>current wallet: {wallet.adapter?.name}</p>
              <p>wallet status: {getWalletStatus()}</p>
              <p>wallet address: {account?.address}</p>
              <p>current network: {wallet.chain?.name}</p>
              <p>
                wallet balance:{' '}
                {formatCurrency(balance ?? 0, {
                  withAbbr: false,
                  decimals: 8,
                })}{' '}
                MOVE
              </p>
              <p>
                wallet publicKey: {uint8arrayToHex(wallet.account?.publicKey)}
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
