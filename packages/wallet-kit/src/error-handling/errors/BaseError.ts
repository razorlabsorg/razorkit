import { ErrorCode } from '../constants';

/**
 * BaseError is a base class for all error classes in this sdk.
 */
export class BaseError extends Error {
  /**
   * The error code of this error
   */
  code: ErrorCode;

  /**
   * Any additional details for this error
   */
  details: Record<string, any> | undefined;

  /**
   * Constructs a new BaseError with a given message, code, and optional details
   *
   * @param {string} message - The error message
   * @param {ErrorCode} [code] - The error code
   * @param {Record<string, any>} [details] - Any additional details for this error
   */
  constructor(
    message: string,
    code: ErrorCode = ErrorCode.UNKNOWN_ERROR,
    details?: Record<string, any>,
  ) {
    super(message);
    this.details = details;
    this.code = code;
    this.message = this.formatErrorStr(message, details);
  }

  /**
   * Format the error string with the given message and details
   *
   * @param {string} message - The error message
   * @param {Record<string, any>} [details] - Any additional details for this error
   * @returns {string} The formatted error string
   */
  formatErrorStr(message: string, details?: Record<string, any>): string {
    let str = `[${this.code}] ${message}`;
    if (details) str += ' | details: ' + JSON.stringify(details);
    return str;
  }
}
