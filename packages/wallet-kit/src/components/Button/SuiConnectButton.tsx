import React, { ReactNode, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Extendable } from '../../types/utils';
import ConnectModal from '../Modal/SuiConnectModal';
import { useSuiWallet } from '../../hooks/useSuiWallet';
import './index.scss';
import SuiWalletInfo from '../SuiWalletInfo';
import { BaseError } from '../../error-handling';

export type SuiConnectButtonProps = Extendable & {
  label?: string;
  children?: ReactNode;
  onConnectSuccess?: (walletName: string) => void;
  onConnectError?: (error: BaseError) => void;
  onDisconnectSuccess?: (walletName: string) => void;
  onDisconnectError?: (error: BaseError) => void;
};

export const SuiConnectButton = (props: SuiConnectButtonProps) => {
  const { label = 'Connect Button' } = props;
  const [showModal, setShowModal] = useState(false);
  const { connected } = useSuiWallet();

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
          <SuiWalletInfo
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

export default SuiConnectButton;
