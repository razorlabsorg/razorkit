import { Chain } from './types';

export const MovementDevnetChain: Chain = {
  id: 4,
  name: 'Movement Aptos Devnet',
  rpcUrl: 'https://aptos.devnet.m1.movementlabs.xyz',
};

export const MovementSuzukaTestnetChain: Chain = {
  id: 27,
  name: 'Movement Suzuka Testnet',
  rpcUrl: 'https://aptos.testnet.suzuka.movementlabs.xyz/v1',
};

export const MovementPortoTestnetChain: Chain = {
  id: 177,
  name: 'Movement Porto Testnet',
  rpcUrl: 'https://aptos.testnet.porto.movementlabs.xyz/v1',
};

export const MovementBardockTestnetChain: Chain = {
  id: 250,
  name: 'Movement Bardock Testnet',
  rpcUrl: 'https://aptos.testnet.bardock.movementlabs.xyz/v1',
};

export const UnknownChain: Chain = {
  id: 0,
  name: 'Unknown Network',
  rpcUrl: '',
};

export const DefaultChains = [
  MovementDevnetChain,
  MovementSuzukaTestnetChain,
  MovementPortoTestnetChain,
  MovementBardockTestnetChain,
];
