import { useQuery } from 'react-query';
import { QueryKey, queryKey } from '../constants';
import { useCallback } from 'react';
import { useAptosWallet } from './useAptosWallet';
import { useAptosChain } from './useAptosChain';
import { AptosAccountAssetManager } from '../account/aptos';

export interface AptosUseCoinBalanceParams {
  address?: string;
  typeArg?: string;
  chainId?: string;
}

/**
 * use the account balance of one specific coin (APT by default)
 * @param params
 */
export function useAptosCoinBalance(params?: AptosUseCoinBalanceParams) {
  const wallet = useAptosWallet();
  const {
    address = wallet.address,
    typeArg = '0x1::aptos_coin::AptosCoin',
    chainId = wallet.chain?.id,
  } = params || {};
  const chain = useAptosChain(chainId);

  const key = queryKey(QueryKey.APTOS_COIN_BALANCE, {
    address,
    typeArg,
    chainId,
  });
  const getCoinBalance = useCallback(() => {
    if (!address || !chain) return BigInt(0);

    const accountAssetManager = new AptosAccountAssetManager(address, {
      chainRpcUrl: chain.rpcUrl,
    });
    return accountAssetManager.getCoinBalance(typeArg);
  }, [address, chain, typeArg]);

  return useQuery(key, getCoinBalance, {
    initialData: BigInt(0),
  });
}
