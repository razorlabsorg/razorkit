import { StandardConnectOutput } from '@razorlabs/wallet-standard';

export default function getActiveChainFromConnectResult(
  connectRes: StandardConnectOutput
) {
  if (connectRes?.accounts?.[0]?.chains?.[0]) {
    return connectRes.accounts[0].chains[0];
  }
  return 'm2:unknown';
}
