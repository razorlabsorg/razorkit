import { useQuery } from 'react-query';
import { QueryKey, queryKey } from '../constants';
import { useCallback } from 'react';
import { useWallet } from './useWallet';
import { AccountAssetManager } from '@razorlabs/wallet-sdk';
import { useChain } from './useChain';

export interface UseCoinBalanceParams {
  address?: string;
  typeArg?: string;
  chainId?: string;
}

/**
 * use the account balance of one specific coin (APT by default)
 * @param params
 */
export function useCoinBalance(params?: UseCoinBalanceParams) {
  const wallet = useWallet();
  const { address = wallet.address, typeArg = '0x1::aptos_coin::AptosCoin', chainId = wallet.chain?.id } = params || {};
  const chain = useChain(chainId);

  const key = queryKey(QueryKey.MOVE_COIN_BALANCE, {
    address,
    typeArg,
    chainId,
  });
  const getCoinBalance = useCallback(() => {
    if (!address || !chain) return BigInt(0);

    const accountAssetManager = new AccountAssetManager(address, {
      chainRpcUrl: chain.rpcUrl,
    });
    return accountAssetManager.getCoinBalance(typeArg);
  }, [address, chain, typeArg]);

  return useQuery(key, getCoinBalance, {
    initialData: BigInt(0),
  });
}
