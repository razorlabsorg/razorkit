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
};

export const MovementMainnetChain: Chain = {
  id: 126,
  name: 'Movement Mainnet',
  rpcUrl: 'https://mainnet.movementnetwork.xyz/v1',
  indexerUrl: 'https://rpc.sentio.xyz/movement-indexer/v1/graphql',
};

export const AptosTestnetChain: Chain = {
  id: 2,
  name: 'Aptos Testnet',
  rpcUrl: 'https://api.testnet.aptoslabs.com/v1',
  indexerUrl: 'https://api.testnet.aptoslabs.com/v1/graphql',
};

export const AptosMainnetChain: Chain = {
  id: 1,
  name: 'Aptos Mainnet',
  rpcUrl: 'https://api.mainnet.aptoslabs.com/v1',
  indexerUrl: 'https://api.mainnet.aptoslabs.com/v1/graphql',
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
  AptosTestnetChain,
  AptosMainnetChain,
];
