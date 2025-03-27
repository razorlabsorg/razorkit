import { useQuery } from '@tanstack/react-query';
import { QueryKey, queryKey } from '../constants';
import { useWallet } from './useWallet';
import { useChain } from './useChain';
import { useProvider } from './useProvider';
import { MovementMainnetChain } from '@razorlabs/wallet-sdk';
import { AccountAddress } from '@aptos-labs/ts-sdk';

export interface UseCoinBalanceParams {
  accountAddress?: string;
  coinType?: string;
  faAddress?: string;
  chainId?: string;
}

/**
 * use the account balance of one specific coin (APT by default)
 * @param params
 */
export function useCoinBalance(params?: UseCoinBalanceParams) {
  const wallet = useWallet();
  const {
    accountAddress = wallet.address,
    coinType = '0x1::aptos_coin::AptosCoin',
    faAddress = '0xa',
    chainId = wallet.chain?.id,
  } = params || {};
  const chain = useChain(chainId);
  const fallBackRpcUrl = MovementMainnetChain.rpcUrl;
  const client = useProvider(chain?.rpcUrl ?? fallBackRpcUrl, chain?.indexerUrl)

  const key = queryKey(QueryKey.MOVE_COIN_BALANCE, {
    accountAddress,
    coinType,
    faAddress,
    chainId,
  });

  const getCoinBalance = async () => {
    if (!accountAddress || !chain) return BigInt(0);
    let balance = BigInt(0);
    if (coinType) {
      if (coinType === '0x1::aptos_coin::AptosCoin') {
        const onChainBalance = await client.getAccountAPTAmount({ accountAddress: accountAddress })
        balance = BigInt(onChainBalance)
      } else {
        const onChainBalance = await client.getAccountCoinAmount({ accountAddress: accountAddress, coinType: coinType as `${string}::${string}::${string}` })
        balance = BigInt(onChainBalance)
      }
    } else {
      if (faAddress === '0xa' || faAddress === AccountAddress.A.toStringLong()) {
        const onChainBalance = await client.getAccountAPTAmount({ accountAddress: accountAddress })
        balance = BigInt(onChainBalance)
      } else {
        const onChainBalance = await client.getAccountCoinAmount({ accountAddress: accountAddress, faMetadataAddress: faAddress })
        balance = BigInt(onChainBalance)
      }
    }
    return balance;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: [key],
    queryFn: getCoinBalance,
    initialData: BigInt(0),
    refetchInterval: 30000,
  });

  return {
    refetch,
    data,
    isLoading,
  };
}
