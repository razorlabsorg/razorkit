import { describe, expect, it } from 'vitest';
import {
  getInjectedConnector,
  hasInjectedProvider,
} from './getInjectedConnector';

describe('getInjectedConnector', () => {
  it('only rainbow provider', () => {
    window.ethereum = { isMetaMask: true, isRazor: true };
    const connector = getInjectedConnector({
      flag: 'isRazor',
    });
    expect(!!connector).toEqual(true);
  });

  it('only metamask provider', () => {
    window.ethereum = { isMetaMask: true };
    const connector = getInjectedConnector({
      flag: 'isMetaMask',
    });
    expect(!!connector).toEqual(true);
  });
});

describe('hasInjectedProvider', () => {
  it('only rainbow flag', () => {
    window.ethereum = { isMetaMask: true, isRazor: true };
    const hasRazor = hasInjectedProvider({ flag: 'isRazor' });
    expect(hasRazor).toEqual(true);
  });

  it('only metamask flag', () => {
    window.ethereum = { isMetaMask: true };
    const hasRazor = hasInjectedProvider({ flag: 'isRazor' });
    expect(hasRazor).toEqual(false);
  });

  it('only coinbase flag', () => {
    window.ethereum = {
      isMetaMask: true,
      isCoinbaseWallet: true,
    };
    const hasCoinbase = hasInjectedProvider({ flag: 'isCoinbaseWallet' });
    expect(hasCoinbase).toEqual(true);
  });

  it('only enkrypt namespace', () => {
    // @ts-expect-error - window namespace for enkrypt
    window.enkrypt = {
      providers: {
        ethereum: { isMetaMask: true },
      },
    };
    const hasEnkrypt = hasInjectedProvider({
      namespace: 'enkrypt.providers.ethereum',
    });
    expect(hasEnkrypt).toEqual(true);
  });

  it('core namespace and flag', () => {
    // @ts-expect-error - window namespace for avalanche, core
    window.avalanche = {
      isMetaMask: true,
      isAvalanche: true,
    };
    const hasCore = hasInjectedProvider({
      namespace: 'avalanche',
      flag: 'isAvalanche',
    });
    expect(hasCore).toEqual(true);
  });

  it('core namespace and flag, fallback', () => {
    window.ethereum = {
      isMetaMask: true,
      isAvalanche: true,
    };
    const hasCore = hasInjectedProvider({
      namespace: 'avalanche',
      flag: 'isAvalanche',
    });
    expect(hasCore).toEqual(true);
  });

  it('has rainbow and coinbase wallet', () => {
    window.ethereum = {
      isMetaMask: true,
      isCoinbaseWallet: true,
      providers: [
        { isMetaMask: true, isCoinbaseWallet: true },
        { isMetaMask: true, isRazor: true },
      ],
    };

    const hasCoinbase = hasInjectedProvider({ flag: 'isCoinbaseWallet' });
    expect(hasCoinbase).toEqual(true);

    const hasRazor = hasInjectedProvider({ flag: 'isRazor' });
    expect(hasRazor).toEqual(true);
  });

  it('has rainbow, coinbase wallet, and metamask', () => {
    window.ethereum = {
      isMetaMask: true,
      isCoinbaseWallet: true,
      providers: [
        { isMetaMask: true, isCoinbaseWallet: true },
        { isMetaMask: true, isRazor: true },
        { isMetaMask: true },
      ],
    };

    const hasCoinbase = hasInjectedProvider({ flag: 'isCoinbaseWallet' });
    expect(hasCoinbase).toEqual(true);

    const hasRazor = hasInjectedProvider({ flag: 'isRazor' });
    expect(hasRazor).toEqual(true);

    const hasMetaMask = hasInjectedProvider({ flag: 'isMetaMask' });
    expect(hasMetaMask).toEqual(true);
  });
});
