import { StandardConnectOutput } from '@mysten/wallet-standard';

export default function getActiveSuiChainFromConnectResult(
  connectRes: StandardConnectOutput,
) {
  if (connectRes?.accounts?.[0]?.chains?.[0]) {
    return connectRes.accounts[0].chains[0];
  }
  return 'm2:unknown';
}
