import { stringBytesToUint8Array } from './stringBytesToUint8Array';

/**
 * Converts a string of bytes to a string.
 *
 * @param {string} stringBytes - The string of bytes to convert.
 * @return {string} The decoded string.
 */
export function stringBytesToString(stringBytes: string) {
  return new TextDecoder().decode(stringBytesToUint8Array(stringBytes));
}
