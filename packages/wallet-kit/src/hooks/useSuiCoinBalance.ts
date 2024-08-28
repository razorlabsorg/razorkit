import { useSuiWallet } from './useSuiWallet';
import { SUI_TYPE_ARG } from '@mysten/sui/utils';
import { useQuery } from 'react-query';
import { QueryKey, queryKey } from '../constants';
import { useCallback } from 'react';
import { useSuiChain } from './useSuiChain';
import { SuiAccountAssetManager } from '../account/sui';

export interface SuiUseCoinBalanceParams {
  address?: string;
  typeArg?: string;
  chainId?: string;
}

/**
 * use the account balance of one specific coin (SUI by default)
 * @param params
 */
export function useSuiCoinBalance(params?: SuiUseCoinBalanceParams) {
  const wallet = useSuiWallet();
  const {
    address = wallet.address,
    typeArg = SUI_TYPE_ARG,
    chainId = wallet.chain?.id,
  } = params || {};
  const chain = useSuiChain(chainId);

  const key = queryKey(QueryKey.SUI_COIN_BALANCE, {
    address,
    typeArg,
    chainId,
  });
  const getCoinBalance = useCallback(() => {
    if (!address || !chain) return BigInt(0);

    const accountAssetManager = new SuiAccountAssetManager(address, {
      chainRpcUrl: chain.rpcUrl,
    });
    return accountAssetManager.getCoinBalance(typeArg);
  }, [address, chain, typeArg]);

  return useQuery(key, getCoinBalance, {
    initialData: BigInt(0),
  });
}
