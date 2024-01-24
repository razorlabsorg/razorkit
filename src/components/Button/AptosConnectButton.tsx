import React, { ReactNode, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Extendable } from '../../types/utils';
import ConnectModal from '../Modal/AptosConnectModal';
import { useAptosWallet } from '../../hooks/useAptosWallet';
import './index.scss';
import AptosWalletInfo from '../AptosWalletInfo';
import { BaseError } from '@razorlabs/wallet-sdk';

export type ConnectButtonProps = Extendable & {
  label?: string;
  children?: ReactNode;
  onConnectSuccess?: (walletName: string) => void;
  onConnectError?: (error: BaseError) => void;
  onDisconnectSuccess?: (walletName: string) => void;
  onDisconnectError?: (error: BaseError) => void;
};

export const AptosConnectButton = (props: ConnectButtonProps) => {
  const { label = 'Connect Button' } = props;
  const [showModal, setShowModal] = useState(false);
  const { connected } = useAptosWallet();

  useEffect(() => {
    if (connected) {
      setShowModal(false);
    }
  }, [connected]);

  return (
    <ConnectModal
      open={showModal}
      onOpenChange={(open) => {
        if (connected) return;
        setShowModal(open);
      }}
      onConnectSuccess={props.onConnectSuccess}
      onConnectError={props.onConnectError}
    >
      <div>
        {connected ? (
          <AptosWalletInfo
            className={classnames(props.className)}
            style={props.style}
            onDisconnectSuccess={(name) => {
              setShowModal(false);
              props?.onDisconnectSuccess?.(name);
            }}
            onDisconnectError={props.onDisconnectError}
          />
        ) : (
          <button
            className={classnames('wkit-button', props.className)}
            style={props.style}
          >
            {props.children || label}
          </button>
        )}
      </div>
    </ConnectModal>
  );
};

export default AptosConnectButton;
