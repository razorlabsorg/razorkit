import { Chain } from './types';

export enum AptosChainId {
  DEV_NET = 'aptos:devnet',
  TEST_NET = 'aptos:testnet',
  MAIN_NET = 'aptos:mainnet',
}

export const AptosDevnetChain: Chain = {
  id: AptosChainId.DEV_NET,
  name: 'Movement Aptos Devnet',
  rpcUrl: 'https://aptos.devnet.m1.movementlabs.xyz',
};

export const AptosTestnetChain: Chain = {
  id: AptosChainId.TEST_NET,
  name: 'Movement Aptos Testnet',
  rpcUrl: 'https://aptos.testnet.suzuka.movementlabs.xyz/v1',
};

export const UnknownChain: Chain = {
  id: 'unknown:unknown',
  name: 'Unknown Network',
  rpcUrl: '',
};

export const DefaultChains = [AptosTestnetChain, AptosDevnetChain];
