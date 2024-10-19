import { BaseError } from './BaseError';
import { ErrorCode } from '../constants';

/**
 * Class representing a KitError.
 *
 * @class
 * @extends {BaseError}
 */
export class KitError extends BaseError {
  /**
   * Creates an instance of KitError.
   *
   * @param {string} [message='kit unknown error'] - The error message.
   * @param {ErrorCode} [code=ErrorCode.KIT__UNKNOWN_ERROR] - The error code.
   * @param {Record<string, any>} [details] - Additional details for the error.
   * @memberof KitError
   */
  constructor(
    message: string = 'kit unknown error',
    code: ErrorCode = ErrorCode.KIT__UNKNOWN_ERROR,
    details?: Record<string, any>,
  ) {
    super(message, code, details);
  }
}
