import { useAptosCoinBalance } from './useAptosCoinBalance';

export interface UseAptosAccountBalanceParams {
  typeArg?: string;
  chainId?: string;
}

export function useAptosAccountBalance(params?: UseAptosAccountBalanceParams) {
  const { typeArg, chainId } = params || {};
  const res = useAptosCoinBalance({
    typeArg,
    chainId,
  });
  return Object.assign(res, {
    // legacy interfaces
    balance: res.data,
    loading: res.isLoading,
  });
}
