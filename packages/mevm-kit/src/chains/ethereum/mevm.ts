import { defineChain } from 'viem';

export const mevmImola = /*#__PURE__*/ defineChain({
  id: 30_732,
  name: 'MEVM Imola Testnet',
  nativeCurrency: { name: 'Move', symbol: 'MOVE', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://mevm.devnet.imola.movementlabs.xyz'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Movement Explorer',
      url: 'https://explorer.devnet.imola.movementlabs.xyz',
      apiUrl: 'https://explorer.devnet.imola.movementlabs.xyz',
    },
  },
  testnet: true,
});
