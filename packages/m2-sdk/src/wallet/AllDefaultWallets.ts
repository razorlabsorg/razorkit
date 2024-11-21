import * as presets from './preset-wallets';

export const AllDefaultWallets = [
  presets.RazorSuiWallet,
  ...[presets.SuiWallet].sort((a, b) => (a.name < b.name ? -1 : 1)),
];
