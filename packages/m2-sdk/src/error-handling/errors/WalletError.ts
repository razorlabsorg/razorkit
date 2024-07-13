import { BaseError } from './BaseError';
import { ErrorCode } from '../constants';

/**
 * Class representing a wallet error.
 *
 * @class WalletError
 * @extends BaseError
 * @property {string} [message] - The error message.
 * @property {ErrorCode} [code] - The error code.
 * @property {Record<string, any>} [details] - Any additional details for this error.
 */
export class WalletError extends BaseError {
  constructor(
    message = 'wallet unknown error',
    code = ErrorCode.WALLET__UNKNOWN_ERROR,
    details?: Record<string, any>,
  ) {
    super(message, code, details);
  }
}
