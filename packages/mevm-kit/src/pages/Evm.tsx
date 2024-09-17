import './evm.css'
import { ConnectButton } from '../components/EthConnectButton/ConnectButton'
import React from 'react';


function Mevm() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 12,
      }}
    >
      <ConnectButton />

    </div>
  );
}

export default Mevm;
