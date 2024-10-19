import { WalletError } from './index';
import { ErrorCode } from '../constants';

/**
 * Class representing a wallet not implemented error.
 *
 * @class WalletNotImplementError
 * @extends WalletError
 * @param {string} method - The method that is not implemented.
 */
export class WalletNotImplementError extends WalletError {
  constructor(method: string) {
    super(
      `wallet does not implement function: ${method}`,
      ErrorCode.WALLET__METHOD_NOT_IMPLEMENTED_ERROR,
    );
  }
}
