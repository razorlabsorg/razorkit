import React, { useCallback, useEffect, useState } from 'react';
import { BaseModal } from './BaseModal';
import { Extendable } from '../../types/utils';
import * as Dialog from '@radix-ui/react-dialog';
import { SvgArrowLeft, SvgClose } from '../Icon/SvgIcons';
import { useWallet } from '../../hooks';
import { isNonEmptyArray } from '../../utils/check';
import Icon from '../Icon';
import './index.scss';
import { BaseError, IWallet, KitError } from '@razorlabs/wallet-sdk';

export type ConnectModalProps = Extendable & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConnectSuccess?: (walletName: string) => void;
  onConnectError?: (error: BaseError) => void;
};

type WalletItemProps = Extendable & {
  wallet: IWallet;
  onSelect?: (wallet: IWallet) => void;
};

const Header: React.FC = () => {
  return (
    <div className={'wkit-dialog__header'}>
      <Dialog.Title className={'wkit-dialog__title'}>
        {'Connect Wallet'}
      </Dialog.Title>
      <Dialog.Close
        style={{ position: 'absolute', right: '16px', top: '16px' }}
        className={'wkit-dialog__close'}
      >
        <SvgClose />
      </Dialog.Close>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <div className={'wkit-new-to-movement'}>
      <span className={'wkit-new-to-movement__text'}>New to Movement? </span>
      <a
        className={'wkit-new-to-movement__link'}
        href="https://docs.movementlabs.xyz"
        target="_blank"
      >
        Learn More Here
      </a>
    </div>
  );
};

const WalletItem: React.FC<WalletItemProps> = (props) => {
  const { wallet } = props;
  const [icon, setIcon] = useState<string>('');

  useEffect(() => {
    if (!wallet.iconUrl) return;
    setIcon(wallet.iconUrl);
  }, [wallet.iconUrl]);

  return (
    <div
      className={'wkit-select-item'}
      key={wallet.name}
      onClick={() => {
        props.onSelect?.(wallet);
      }}
    >
      <Icon
        icon={icon}
        className={'wkit-select-item__icon'}
        elClassName={'wkit-select-item__icon'}
      />
      {wallet.label ?? wallet.name}
    </div>
  );
};

const WalletList: React.FC<{
  title: string;
  wallets: IWallet[];
  onSelect?: (wallet: IWallet) => void;
}> = (props) => {
  if (!isNonEmptyArray(props.wallets)) return null;
  return (
    <div className={'wkit-select__container'}>
      <div className={'wkit-select__title'}>{props.title}</div>
      {isNonEmptyArray(props.wallets) &&
        props.wallets.map((wallet) => {
          return (
            <WalletItem
              key={wallet.name}
              wallet={wallet}
              onSelect={props.onSelect}
            />
          );
        })}
    </div>
  );
};

type InstallGuideProps = Extendable & {
  wallet: IWallet;
  onNavBack?: () => void;
};

const InstallGuide: React.FC<InstallGuideProps> = (props) => {
  const { wallet } = props;
  return (
    <section>
      <div className={'wkit-dialog__header'}>
        <Dialog.Title
          className={'wkit-dialog__title'}
          style={{ margin: '-8px 12px -6px -8px' }}
        >
          <span className="wkit-dialog__close" onClick={props.onNavBack}>
            <SvgArrowLeft />
          </span>
        </Dialog.Title>

        <Dialog.Title className={'wkit-dialog__title'}>
          Install Wallet
        </Dialog.Title>
      </div>
      <div className="wkit-install">
        <img
          className="wkit-install__logo"
          src={wallet.iconUrl}
          alt={`${wallet.name} logo`}
        />
        <h1 className="wkit-install__title">You haven’t install this wallet</h1>
        <p className="wkit-install__description">
          Install wallet via Chrome Extension Store
        </p>
        <button
          className="wkit-button wkit-install__button"
          onClick={() => {
            if (!wallet.downloadUrl?.browserExtension) {
              throw new KitError(
                `no downloadUrl config on this wallet: ${wallet.name}`,
              );
            }
            window.open(wallet.downloadUrl.browserExtension, '_blank');
          }}
        >
          Get Wallet
        </button>
      </div>
    </section>
  );
};

type ConnectingProps = Extendable & {
  wallet: IWallet;
  onNavBack?: () => void;
};

const Connecting: React.FC<ConnectingProps> = (props) => {
  const { wallet } = props;
  return (
    <section>
      <div className={'wkit-dialog__header'}>
        <Dialog.Title
          className={'wkit-dialog__title'}
          style={{ margin: '-6px 12px -6px -8px' }}
        >
          <span className="wkit-dialog__close" onClick={props.onNavBack}>
            <SvgArrowLeft />
          </span>
        </Dialog.Title>

        <Dialog.Title className={'wkit-dialog__title'}>Connecting</Dialog.Title>
      </div>
      <div className="wkit-connecting">
        <img
          className="wkit-connecting__logo"
          src={wallet.iconUrl}
          alt={`logo of ${wallet.name}`}
        />
        <h1 className="wkit-connecting__title">Opening {wallet.name}</h1>
        <p className="wkit-connecting__description">
          Confirm connection in the extension
        </p>
      </div>
    </section>
  );
};

export const ConnectModal: React.FC<ConnectModalProps> = (props) => {
  const { configuredWallets, detectedWallets, select, connecting } =
    useWallet();

  const {
    onConnectSuccess = () => {},
    onConnectError = (err) => {
      throw err;
    },
  } = props;

  const [activeWallet, setActiveWallet] = useState<IWallet | undefined>();

  const handleSelectWallet = useCallback(
    async (wallet: IWallet) => {
      setActiveWallet(wallet);
      if (wallet.installed) {
        try {
          await select(wallet.name);
        } catch (err) {
          onConnectError(err as BaseError);
          return;
        }
        onConnectSuccess(wallet.name);
      }
    },
    [onConnectError, onConnectSuccess, select],
  );

  function renderBody() {
    if (activeWallet) {
      if (!activeWallet.installed) {
        return (
          <InstallGuide
            wallet={activeWallet}
            onNavBack={() => {
              setActiveWallet(undefined);
            }}
          />
        );
      }
      if (connecting) {
        return (
          <Connecting
            wallet={activeWallet}
            onNavBack={() => {
              setActiveWallet(undefined);
            }}
          />
        );
      }
    }
    return (
      <div>
        <Header />
        <div className="wkit-select__scroll">
          <WalletList
            title={'Popular'}
            wallets={configuredWallets}
            onSelect={handleSelectWallet}
          />
          <WalletList
            title={'Others'}
            wallets={detectedWallets}
            onSelect={handleSelectWallet}
          />
        </div>
        <div style={{ height: '41px', flexShrink: '0' }}></div>
        <Footer />
      </div>
    );
  }

  return (
    <BaseModal
      open={props.open}
      onOpenChange={props.onOpenChange}
      trigger={props.children}
      contentProps={{
        onOpenAutoFocus: (e: Event) => {
          e.preventDefault();
        },
      }}
    >
      {renderBody()}
    </BaseModal>
  );
};

export default ConnectModal;
