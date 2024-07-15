/**
 * Converts a string of bytes to a Uint8Array.
 *
 * @param {string} bytes - The string of bytes to convert.
 * @return {Uint8Array} The Uint8Array representation of the input string.
 */
export function stringBytesToUint8Array(bytes: string): Uint8Array {
  return Uint8Array.from(atob(bytes), (c) => c.charCodeAt(0));
}
