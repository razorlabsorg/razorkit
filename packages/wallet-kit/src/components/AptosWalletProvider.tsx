/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AptosWalletContext } from '../hooks';
import {
  UserResponseStatus,
  type AptosConnectInput,
  type AptosSignAndSubmitTransactionInput,
  type AptosSignMessageInput,
  type WalletAccount,
} from '@aptos-labs/wallet-standard';
import { Extendable } from '../types/utils';
import { isNonEmptyArray } from '../utils/check';
import { useAptosAutoConnect } from '../hooks/useAptosAutoConnect';
import { Storage } from '../utils/storage';
import { StorageKey } from '../constants/storage';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  AllDefaultAptosWallets,
  Chain,
  ConnectionStatus,
  DefaultChains,
  FeatureName,
  IWalletAdapter,
  IDefaultWallet,
  KitError,
  UnknownChain,
  // verifySignedMessage,
} from '@razorlabs/wallet-sdk';
import { useAvailableAptosWallets } from '../hooks/useAvailableAptosWallets';
import getActiveAptosChain from '../utils/getActiveAptosChain';
import { AnyRawTransaction } from '@aptos-labs/ts-sdk';

export type AptosWalletProviderProps = Extendable & {
  defaultWallets?: IDefaultWallet[];
  chains?: Chain[];
  autoConnect?: boolean;
};

export const AptosWalletProvider = (props: AptosWalletProviderProps) => {
  const {
    defaultWallets = AllDefaultAptosWallets,
    chains = DefaultChains,
    autoConnect = true,
    children,
  } = props;

  const { allAvailableWallets, configuredWallets, detectedWallets } =
    useAvailableAptosWallets(defaultWallets);

  const [walletAdapter, setWalletAdapter] = useState<
    IWalletAdapter | undefined
  >();
  const [status, setStatus] = useState<ConnectionStatus>(
    ConnectionStatus.DISCONNECTED,
  );
  const [chain, setChain] = useState(() => {
    if (isNonEmptyArray(chains)) return chains[0]; // first one as default chain
    return UnknownChain;
  });
  const walletOffListeners = useRef<(() => void)[]>([]);

  const isCallable = (
    walletAdapter: IWalletAdapter | undefined,
    status: ConnectionStatus,
  ) => {
    return walletAdapter && status === ConnectionStatus.CONNECTED;
  };

  const account = useMemo<WalletAccount | undefined>(() => {
    if (!isCallable(walletAdapter, status)) return;
    return (walletAdapter as IWalletAdapter).accounts[0]; // use first account by default
  }, [walletAdapter, status]);

  const ensureCallable = (
    walletAdapter: IWalletAdapter | undefined,
    status: ConnectionStatus,
  ) => {
    if (!isCallable(walletAdapter, status)) {
      throw new KitError('Failed to call function, wallet not connected');
    }
  };

  const connect = useCallback(
    async (adapter: IWalletAdapter, opts?: AptosConnectInput) => {
      if (!adapter) throw new KitError('param adapter is missing');

      setStatus(ConnectionStatus.CONNECTING);
      try {
        const res = await adapter.connect(opts?.[0]);

        const network = await adapter.network();

        // try to get chain from the connected account
        if (res.status === UserResponseStatus.APPROVED) {
          const chainId = getActiveAptosChain(network);
          const targetChain = chains.find((item) => item.id === chainId);
          setChain(targetChain ?? UnknownChain);
        }

        setWalletAdapter(adapter);
        setStatus(ConnectionStatus.CONNECTED);

        const storage = new Storage();
        storage.setItem(StorageKey.LAST_CONNECT_WALLET_NAME, adapter.name);
        return res;
      } catch (e) {
        setWalletAdapter(undefined);
        setStatus(ConnectionStatus.DISCONNECTED);
        throw e;
      }
    },
    [],
  );

  const disconnect = useCallback(async () => {
    ensureCallable(walletAdapter, status);
    const adapter = walletAdapter as IWalletAdapter;

    // try to clear listeners
    if (isNonEmptyArray(walletOffListeners.current)) {
      walletOffListeners.current.forEach((off) => {
        try {
          off();
        } catch (e) {
          console.error(
            'error when clearing wallet listener',
            (e as any).message,
          );
        }
      });
      walletOffListeners.current = []; // empty array
    }

    // clear storage for last connected wallet
    // if users disconnect wallet manually
    const storage = new Storage();
    storage.removeItem(StorageKey.LAST_CONNECT_WALLET_NAME);

    try {
      if (adapter.hasFeature(FeatureName.APTOS__DISCONNECT)) {
        await adapter.disconnect();
      }
    } finally {
      setWalletAdapter(undefined);
      setStatus(ConnectionStatus.DISCONNECTED);
      setChain(chains?.[0] ?? UnknownChain);
    }
  }, [walletAdapter, status]);

  const select = useCallback(
    async (walletName: string) => {
      // disconnect previous connection if it exists
      if (isCallable(walletAdapter, status)) {
        const adapter = walletAdapter as IWalletAdapter;
        // Same wallet, ignore
        if (walletName === adapter.name) return;

        // else first disconnect current wallet
        await disconnect();
      }

      const wallet = allAvailableWallets.find(
        (wallet) => wallet.name === walletName,
      );
      if (!wallet) {
        const availableWalletNames = allAvailableWallets.map(
          (wallet) => wallet.name,
        );
        throw new KitError(
          `select failed: wallet ${walletName} is not available, all wallets are listed here: [${availableWalletNames.join(
            ', ',
          )}]`,
        );
      }
      await connect(wallet.adapter as IWalletAdapter);
    },
    [walletAdapter, status, allAvailableWallets],
  );

  const getAccounts = useCallback(() => {
    ensureCallable(walletAdapter, status);
    const _wallet = walletAdapter as IWalletAdapter;
    return _wallet.accounts;
  }, [walletAdapter, status]);

  const signAndSubmitTransaction = useCallback(
    async (input: AptosSignAndSubmitTransactionInput) => {
      ensureCallable(walletAdapter, status);
      if (!account) {
        throw new KitError('no active account');
      }
      const _wallet = walletAdapter as IWalletAdapter;
      return await _wallet.signAndSubmitTransaction(input);
    },
    [walletAdapter, status, chain, account],
  );

  const signTransaction = useCallback(
    async (transaction: AnyRawTransaction, asFeePayer?: boolean) => {
      ensureCallable(walletAdapter, status);
      if (!account) {
        throw new KitError('no active account');
      }
      const _wallet = walletAdapter as IWalletAdapter;
      return await _wallet.signTransaction(transaction, asFeePayer);
    },
    [walletAdapter, status, chain, account],
  );

  const signMessage = useCallback(
    async (input: AptosSignMessageInput) => {
      ensureCallable(walletAdapter, status);
      if (!account) {
        throw new KitError('no active account');
      }

      const adapter = walletAdapter as IWalletAdapter;
      return await adapter.signMessage(input);
    },
    [walletAdapter, account, status],
  );

  useAptosAutoConnect(select, status, allAvailableWallets, autoConnect);

  // sync kit's chain with wallet's active chain

  return (
    <AptosWalletContext.Provider
      value={{
        name: walletAdapter?.name,
        chains,
        chain,
        allAvailableWallets,
        configuredWallets,
        detectedWallets,
        adapter: walletAdapter,
        status,
        connecting: status === ConnectionStatus.CONNECTING,
        connected: status === ConnectionStatus.CONNECTED,
        select,
        disconnect,
        getAccounts,
        account,
        signAndSubmitTransaction,
        signMessage,
        signTransaction,
        // verifySignedMessage,
        address: account?.address,
      }}
    >
      <QueryClientProvider client={new QueryClient()}>
        {children}
      </QueryClientProvider>
    </AptosWalletContext.Provider>
  );
};
