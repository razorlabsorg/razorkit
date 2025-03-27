import { Chain } from './types';

export const MovementBardockTestnetChain: Chain = {
  id: 250,
  name: 'Movement Bardock Testnet',
  rpcUrl: 'https://testnet.bardock.movementnetwork.xyz/v1',
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
  MovementBardockTestnetChain,
];
