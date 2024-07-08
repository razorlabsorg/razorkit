import { AptosGetNetworkOutput } from '@razorlabs/wallet-standard';
import { Network } from 'aptos';

export default function getActiveAptosChain(connectRes: AptosGetNetworkOutput) {
  if (connectRes.name === Network.DEVNET) {
    return 'aptos:devnet';
  }

  if (connectRes.name === Network.TESTNET) {
    return 'aptos:testnet';
  }

  if (connectRes.name === Network.MAINNET) {
    return 'aptos:mainnet';
  }

  return 'unknown:unknown';
}
