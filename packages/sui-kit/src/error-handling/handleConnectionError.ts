import { PresetSuiWallet } from '../wallets/sui/wallet';
import { ErrorCode } from './constants';

/**
 * Represents the response of a wallet error during the connection process.
 *
 * @interface WalletErrorResponse
 */
export interface WalletErrorResponse {
  /**
   * The error code.
   *
   * @type {ErrorCode}
   */
  code: ErrorCode;

  /**
   * The error message.
   *
   * @type {string}
   */
  message: string;

  /**
   * Additional details for the error.
   *
   * @type {Record<string, any>}
   */
  details: Record<string, any>;
}

/**
 * Handles a connection error based on the provided wallet and error.
 *
 * @param {Error} e - The error object.
 * @param {string} wallet - The name of the wallet.
 * @return {WalletErrorResponse} The error response object containing the error code, message, and details.
 */
export function handleSuiConnectionError(
  e: Error,
  wallet: string,
): WalletErrorResponse {
  let code = ErrorCode.WALLET__CONNECT_ERROR; // default error
  let message = e.message;
  switch (wallet) {
    case PresetSuiWallet.SUI_WALLET:
    case PresetSuiWallet.ETHOS_WALLET:
    case PresetSuiWallet.RAZOR_SUI_WALLET:
      if (message.includes('User rejects approval')) {
        code = ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED;
      }
      break;
  }
  return {
    code,
    message,
    details: {
      wallet: wallet,
    },
  };
}
