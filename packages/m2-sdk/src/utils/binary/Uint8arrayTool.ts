import { Buffer } from 'buffer';

/**
 * A utility class for working with Uint8Arrays.
 */
export class Uint8arrayTool {
  /**
   * Converts a Uint8Array to a hexadecimal string.
   *
   * @param {Uint8Array} bytes - The Uint8Array to convert.
   * @return {string} The hexadecimal string.
   */
  static toHex(bytes: Uint8Array): string {
    return Buffer.from(bytes).toString('hex');
  }

  /**
   * Ensures that a value is a Uint8Array.
   *
   * @param {string | Uint8Array | number[]} value - The value to convert.
   * @return {Uint8Array} The converted value.
   */
  static ensureUint8Array(value: string | Uint8Array | number[]): Uint8Array {
    if (typeof value === 'string') {
      return Uint8Array.from(Buffer.from(value, 'base64'));
    } else if (value instanceof Uint8Array) {
      return value;
    } else {
      return Uint8Array.from(value);
    }
  }

  /**
   * Compares two Uint8Arrays for equality.
   *
   * @param {Uint8Array} a - The first Uint8Array.
   * @param {Uint8Array} b - The second Uint8Array.
   * @return {boolean} True if the arrays are equal, false otherwise.
   */
  static bytesEqual(a: Uint8Array, b: Uint8Array) {
    if (a === b) return true;

    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }
}
