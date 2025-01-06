import { AccountAddressInput, AccountAddress } from '@aptos-labs/ts-sdk';

/**
 * Standardizes an address to the format "0x" followed by 64 lowercase hexadecimal digits.
 */
export const standardizeAddress = (address: AccountAddressInput): string => {
  return AccountAddress.from(address, {
    maxMissingChars: 63,
  }).toStringLong();
};
