import { Chain } from './types';

export const MovementPortoTestnetChain: Chain = {
  id: 177,
  name: 'Movement Porto Testnet',
  rpcUrl: 'https://aptos.testnet.porto.movementlabs.xyz/v1',
  indexerUrl: 'https://indexer.testnet.porto.movementnetwork.xyz/v1/graphql',
};

export const MovementBardockTestnetChain: Chain = {
  id: 250,
  name: 'Movement Bardock Testnet',
  rpcUrl: 'https://aptos.testnet.bardock.movementlabs.xyz/v1',
  indexerUrl: 'https://indexer.testnet.movementnetwork.xyz/v1/graphql',
};

export const MovementMainnetChain: Chain = {
  id: 126,
  name: 'Movement Mainnet',
  rpcUrl: 'https://mainnet.movementnetwork.xyz/v1',
  indexerUrl: 'https://indexer.mainnet.movementnetwork.xyz/v1/graphql',
};

export const UnknownChain: Chain = {
  id: 0,
  name: 'Unknown Network',
  rpcUrl: '',
};

export const DefaultChains = [
  MovementMainnetChain,
  MovementPortoTestnetChain,
  MovementBardockTestnetChain,
];
