import { AptosGetNetworkOutput } from '@aptos-labs/wallet-standard';
import { Network } from '@aptos-labs/ts-sdk';

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
