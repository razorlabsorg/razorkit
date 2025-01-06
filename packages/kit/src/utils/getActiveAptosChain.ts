import { AptosGetNetworkOutput } from '@aptos-labs/wallet-standard';

export default function getActiveAptosChain(connectRes: AptosGetNetworkOutput) {
  if (connectRes.chainId === 4) {
    return 4;
  }

  if (connectRes.chainId === 27) {
    return 27;
  }

  if (connectRes.chainId === 177) {
    return 177;
  }

  if (connectRes.chainId === 250) {
    return 250;
  }

  return 0;
}
