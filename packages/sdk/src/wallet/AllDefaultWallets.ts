import * as presets from './preset-wallets';

export const AllDefaultWallets = [
  presets.RazorWallet,
  ...[
    presets.NightlyWallet,
    presets.BitgetWallet,
    presets.OkxWallet,
  ].sort((a, b) => (a.name < b.name ? -1 : 1)),
];
