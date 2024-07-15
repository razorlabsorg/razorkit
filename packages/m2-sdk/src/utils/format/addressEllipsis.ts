/**
 * Truncates the given address to a format of 0x...0000 based on the address length.
 *
 * @param {string} address - The address to truncate.
 * @return {string} The truncated address.
 */
export default function addressEllipsis(address: string): string {
  if (typeof address !== 'string') {
    return '';
  }

  // 0x0000000000000000000000000000000000000000 40bits / 42 length
  if (!address || !address.startsWith('0x')) return address;

  return address.slice(0, 7) + '....' + address.slice(-4, address.length);
}
