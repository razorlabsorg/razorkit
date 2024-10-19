import { useSuiCoinBalance } from './useSuiCoinBalance';

export interface UseSuiAccountBalanceParams {
  typeArg?: string;
  chainId?: string;
}

export function useSuiAccountBalance(params?: UseSuiAccountBalanceParams) {
  const { typeArg, chainId } = params || {};
  const res = useSuiCoinBalance({
    typeArg,
    chainId,
  });
  return Object.assign(res, {
    // legacy interfaces
    balance: res.data,
    loading: res.isLoading,
  });
}
