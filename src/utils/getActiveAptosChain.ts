import { AptosGetNetworkOutput } from '@razorlabs/wallet-standard';
import { Network } from 'aptos';

export default function getActiveAptosChain(connectRes: AptosGetNetworkOutput) {
  if (connectRes.name === Network.DEVNET) {
    return 'm1:devnet';
  }

  if (connectRes.name === Network.TESTNET) {
    return 'm1:testnet';
  }

  if (connectRes.name === Network.MAINNET) {
    return 'm1:mainnet';
  }

  return 'unknown:unknown';
}
