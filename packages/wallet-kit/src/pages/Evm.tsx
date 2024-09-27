import { ConnectButton } from '@razorlabs/razorkit';
import './evm.css';
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
