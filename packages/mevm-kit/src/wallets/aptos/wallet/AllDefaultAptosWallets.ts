import * as presets from './presetAptosWallets';

export const AllDefaultAptosWallets = [
  presets.RazorAptosWallet,
  presets.NightlyWallet,
  ...[presets.PetraWallet].sort((a, b) => (a.name < b.name ? -1 : 1)),
];
