import { useCoinBalance } from './useCoinBalance';

export interface UseAccountBalanceParams {
  typeArg?: string;
  chainId?: string;
}

/**
 * Returns the Aptos account balance using the provided parameters.
 *
 * @param {UseAptosAccountBalanceParams} [params] - Optional parameters for the Aptos account balance.
 * @param {string} [params.typeArg] - The type argument for the Aptos coin balance.
 * @param {string} [params.chainId] - The chain ID for the Aptos network.
 * @return {Object} - An object containing the Aptos account balance and loading state.
 * @property {BigInt} balance - The Aptos account balance.
 * @property {boolean} loading - Indicates if the Aptos account balance is currently being loaded.
 */
export function useAccountBalance(params?: UseAccountBalanceParams) {
  const { typeArg, chainId } = params || {};
  const res = useCoinBalance({
    typeArg,
    chainId,
  });
  return Object.assign(res, {
    // legacy interfaces
    balance: res.data,
    loading: res.isLoading,
  });
}
