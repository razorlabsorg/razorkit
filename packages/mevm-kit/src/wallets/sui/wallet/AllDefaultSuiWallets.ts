import * as presets from './presetSuiWallets';

export const AllDefaultSuiWallets = [
  presets.RazorSuiWallet,
  presets.SuiWallet,
  ...[presets.EthosWallet].sort((a, b) => (a.name < b.name ? -1 : 1)),
];
