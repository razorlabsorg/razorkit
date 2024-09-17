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
