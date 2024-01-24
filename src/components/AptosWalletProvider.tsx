/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AptosWalletContext } from '../hooks';
import type {
  AptosSignAndSubmitTransactionInput,
  AptosSignMessageInput,
  // AptosSignMessageOutput,
  StandardConnectInput,
  WalletAccount,
} from '@razorlabs/wallet-standard';
import { Extendable } from '../types/utils';
import { isNonEmptyArray } from '../utils/check';
import { useAutoConnect } from '../hooks/useAutoConnect';
import { Storage } from '../utils/storage';
import { StorageKey } from '../constants/storage';
import { QueryClient, QueryClientProvider } from 'react-query';
import getActiveChainFromConnectResult from '../utils/getActiveChainFromConnectResult';
import {
  AllDefaultAptosWallets,
  Chain,
  ConnectionStatus,
  DefaultChains,
  FeatureName,
  IAptosWalletAdapter,
  IDefaultWallet,
  KitError,
  UnknownChain,
  // verifySignedMessage,
  WalletEvent,
  WalletEventListeners,
} from '@razorlabs/wallet-sdk';
import { useAvailableAptosWallets } from '../hooks/useAvailableAptosWallets';
import { AptosSignTransactionInput } from '@razorlabs/wallet-standard/dist/features/aptosSignTransaction';

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
    IAptosWalletAdapter | undefined
  >();
  const [status, setStatus] = useState<ConnectionStatus>(
    ConnectionStatus.DISCONNECTED
  );
  const [chain, setChain] = useState(() => {
    if (isNonEmptyArray(chains)) return chains[0]; // first one as default chain
    return UnknownChain;
  });
  const walletOffListeners = useRef<(() => void)[]>([]);

  const isCallable = (
    walletAdapter: IAptosWalletAdapter | undefined,
    status: ConnectionStatus
  ) => {
    return walletAdapter && status === ConnectionStatus.CONNECTED;
  };

  const account = useMemo<WalletAccount | undefined>(() => {
    if (!isCallable(walletAdapter, status)) return;
    return (walletAdapter as IAptosWalletAdapter).accounts[0]; // use first account by default
  }, [walletAdapter, status]);

  const ensureCallable = (
    walletAdapter: IAptosWalletAdapter | undefined,
    status: ConnectionStatus
  ) => {
    if (!isCallable(walletAdapter, status)) {
      throw new KitError('Failed to call function, wallet not connected');
    }
  };

  const connect = useCallback(
    async (adapter: IAptosWalletAdapter, opts?: StandardConnectInput) => {
      if (!adapter) throw new KitError('param adapter is missing');

      setStatus(ConnectionStatus.CONNECTING);
      try {
        const res = await adapter.connect(opts);

        // try to get chain from the connected account
        if (isNonEmptyArray((res as any)?.accounts)) {
          const chainId = getActiveChainFromConnectResult(res);
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
    []
  );

  const disconnect = useCallback(async () => {
    ensureCallable(walletAdapter, status);
    const adapter = walletAdapter as IAptosWalletAdapter;

    // try to clear listeners
    if (isNonEmptyArray(walletOffListeners.current)) {
      walletOffListeners.current.forEach((off) => {
        try {
          off();
        } catch (e) {
          console.error(
            'error when clearing wallet listener',
            (e as any).message
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
      // disconnect is an optional action for wallet
      if (adapter.hasFeature(FeatureName.STANDARD__DISCONNECT)) {
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
        const adapter = walletAdapter as IAptosWalletAdapter;
        // Same wallet, ignore
        if (walletName === adapter.name) return;

        // else first disconnect current wallet
        await disconnect();
      }

      const wallet = allAvailableWallets.find(
        (wallet) => wallet.name === walletName
      );
      if (!wallet) {
        const availableWalletNames = allAvailableWallets.map(
          (wallet) => wallet.name
        );
        throw new KitError(
          `select failed: wallet ${walletName} is not available, all wallets are listed here: [${availableWalletNames.join(
            ', '
          )}]`
        );
      }
      await connect(wallet.adapter as IAptosWalletAdapter);
    },
    [walletAdapter, status, allAvailableWallets]
  );

  const on = useCallback(
    (event: WalletEvent, listener: WalletEventListeners[WalletEvent]) => {
      ensureCallable(walletAdapter, status);
      const _wallet = walletAdapter as IAptosWalletAdapter;

      // filter event and params to decide when to emit
      const off = _wallet.on('change', (params) => {
        if (event === 'change') {
          const _listener = listener as WalletEventListeners['change'];
          _listener(params);
          return;
        }
        if (params.chains && event === 'chainChange') {
          const _listener = listener as WalletEventListeners['chainChange'];
          _listener({ chain: (params.chains as any)?.[0] });
          return;
        }
        if (params.accounts && event === 'accountChange') {
          const _listener = listener as WalletEventListeners['accountChange'];
          _listener({ account: (params.accounts as any)?.[0] });
          return;
        }
        if (params.features && event === 'featureChange') {
          const _listener = listener as WalletEventListeners['featureChange'];
          _listener({ features: params.features });
          return;
        }
      });
      walletOffListeners.current.push(off); // should help user manage off cleaners
      return off;
    },
    [walletAdapter, status]
  );

  const getAccounts = useCallback(() => {
    ensureCallable(walletAdapter, status);
    const _wallet = walletAdapter as IAptosWalletAdapter;
    return _wallet.accounts;
  }, [walletAdapter, status]);

  const signAndSubmitTransaction = useCallback(
    async (input: AptosSignAndSubmitTransactionInput) => {
      ensureCallable(walletAdapter, status);
      if (!account) {
        throw new KitError('no active account');
      }
      const _wallet = walletAdapter as IAptosWalletAdapter;
      return await _wallet.signAndSubmitTransaction(input);
    },
    [walletAdapter, status, chain, account]
  );

  const signTransaction = useCallback(
    async (input: AptosSignTransactionInput) => {
      ensureCallable(walletAdapter, status);
      if (!account) {
        throw new KitError('no active account');
      }
      const _wallet = walletAdapter as IAptosWalletAdapter;
      return await _wallet.signTransaction(input);
    },
    [walletAdapter, status, chain, account]
  );

  const signMessage = useCallback(
    async (input: AptosSignMessageInput) => {
      ensureCallable(walletAdapter, status);
      if (!account) {
        throw new KitError('no active account');
      }

      const adapter = walletAdapter as IAptosWalletAdapter;
      return await adapter.signMessage(input);
    },
    [walletAdapter, account, status]
  );

  useAutoConnect(select, status, allAvailableWallets, autoConnect);

  // sync kit's chain with wallet's active chain
  useEffect(() => {
    if (!walletAdapter || status !== 'connected') return;
    const off = on('chainChange', (params: { chain: string }) => {
      if (params.chain === chain.id) return;
      const newChain = chains.find((item) => item.id === params.chain);
      if (!newChain) {
        setChain(UnknownChain);
        return;
      }
      setChain(newChain);
    });
    return () => {
      off();
    };
  }, [walletAdapter, status, chain, chains, on]);

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
        on,
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
