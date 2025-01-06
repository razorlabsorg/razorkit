import { Wallet, getWallets } from '@aptos-labs/wallet-standard';
import { WalletRadar } from '../WalletRadar';
import { FeatureName } from '../constants';
import { beforeEach } from 'vitest';
import { vitest } from 'vitest';
import { describe } from 'vitest';
import { test } from 'vitest';
import { expect } from 'vitest';

const initialWallets: Wallet[] = [
  {
    name: 'wallet1',
    icon: 'data:image/png;base64,',
    version: '1.0.0',
    accounts: [],
    chains: ['aptos:devnet'],
    features: {
      [FeatureName.APTOS__CONNECT]: () => {},
      [FeatureName.APTOS__SIGN_MESSAGE]: () => {},
      [FeatureName.APTOS__SIGN_AND_SUBMIT_TRANSACTION]: () => {},
    },
  },
];

let listeners: any[] = [];
beforeEach(() => {
  listeners = [];
});

vitest.mock('@aptos-labs/wallet-standard', () => {
  return {
    getAptosWallets: vitest.fn().mockReturnValue({
      aptosWallets: initialWallets,
      on: (event: string, callback: () => void) => {
        listeners.push(callback);
      },
      register: (...wallets: Wallet[]) => {
        listeners.forEach((listener) => listener(...wallets));
      },
    }),
  };
});

describe('test radar detection', () => {
  test('given mocked sdk, when radar is activated, then return detected wallet adapters', () => {
    const walletRadar = new WalletRadar();
    walletRadar.activate();
    const detectedAdapters = walletRadar.getDetectedWalletAdapters();
    initialWallets.forEach((wallet) => {
      expect(detectedAdapters.find((adapter) => adapter.name === wallet.name)).toBeTruthy();
    });
  });

  test('given mocked sdk, when new wallets register, then it should return the new wallets along with the initial detected wallet adapters', () => {
    const walletRadar = new WalletRadar();
    walletRadar.activate();

    const newWallets: Wallet[] = [
      {
        name: 'wallet2',
        icon: 'data:image/png;base64,',
        version: '1.0.0',
        accounts: [],
        chains: ['aptos:devnet'],
        features: {
          [FeatureName.APTOS__CONNECT]: () => {},
          [FeatureName.APTOS__SIGN_MESSAGE]: () => {},
          [FeatureName.APTOS__SIGN_AND_SUBMIT_TRANSACTION]: () => {},
        },
      },
    ];
    let detectedAdapters = walletRadar.getDetectedWalletAdapters();
    expect(detectedAdapters.length).toBe(1);
    // Given
    const sdk = getWallets();
    sdk.register(...newWallets);
    // Then
    detectedAdapters = walletRadar.getDetectedWalletAdapters();
    expect(detectedAdapters.length).toBe(2);
  });
});
