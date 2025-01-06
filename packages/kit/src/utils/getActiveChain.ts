import { AptosGetNetworkOutput } from '@aptos-labs/wallet-standard';

export default function getActiveChain(connectRes: AptosGetNetworkOutput) {
  if (connectRes.chainId === 126) {
    return 126;
  }

  if (connectRes.chainId === 177) {
    return 177;
  }

  if (connectRes.chainId === 250) {
    return 250;
  }

  return 0;
}
