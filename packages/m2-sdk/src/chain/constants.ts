import { Chain } from './types';

export enum SuiChainId {
  DEV_NET = 'sui:devnet',
  TEST_NET = 'sui:testnet',
  MAIN_NET = 'sui:mainnet',
}

export const SuiDevnetChain: Chain = {
  id: SuiChainId.DEV_NET,
  name: 'M2 Devnet',
  rpcUrl: 'https://sui.devnet.m2.movementlabs.xyz/',
};

export const SuiTestnetChain: Chain = {
  id: SuiChainId.TEST_NET,
  name: 'M2 Testnet',
  rpcUrl: 'https://sui.testnet.m2.movementlabs.xyz/',
};


export const SuiMainnetChain: Chain = {
  id: SuiChainId.MAIN_NET,
  name: 'M2 Mainnet',
  rpcUrl: 'https://sui.mainnet.m2.movementlabs.xyz/',
};

export const UnknownChain: Chain = {
  id: 'unknown:unknown',
  name: 'Unknown Network',
  rpcUrl: '',
};

export const DefaultChains = [SuiDevnetChain, SuiTestnetChain, SuiMainnetChain];
