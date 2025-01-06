import * as presets from './preset-wallets';

export const AllDefaultAptosWallets = [
  presets.RazorWallet,
  presets.BitgetWallet,
  presets.OkxWallet,
  ...[presets.NightlyWallet].sort((a, b) => (a.name < b.name ? -1 : 1)),
];
