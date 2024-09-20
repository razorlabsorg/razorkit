/**
 * Adapted from https://github.com/domharrington/js-number-abbreviate
 */
const units = ['k', 'm', 'b', 't'];

/**
 * Truncates a number to a certain number of decimal places.
 *
 * @param {number} number - The number to truncate.
 * @param {number} [precision=1] - The number of decimal places to keep.
 * @return {string} The truncated number as a string.
 */
export function toPrecision(number: number, precision: number = 1): string {
  return number
    .toString()
    .replace(new RegExp(`(.+\\.\\d{${precision}})\\d+`), '$1')
    .replace(/(\.[1-9]*)0+$/, '$1')
    .replace(/\.$/, '');
}

/**
 * Converts a number into a string representation with an abbreviated unit at the end.
 *
 * @param {number} number - The number to abbreviate.
 * @returns {string} A string representation of the number with an abbreviated unit at the end.
 *
 * @example
 * abbreviateETHBalance(10000); // Returns '10k'
 * abbreviateETHBalance(10000000); // Returns '10M'
 * abbreviateETHBalance(1000000000000); // Returns '10B'
 * abbreviateETHBalance(1000000000000000); // Returns '10T'
 */
export function abbreviateETHBalance(number: number): string {
  if (number < 1) return toPrecision(number, 3);
  if (number < 10 ** 2) return toPrecision(number, 2);
  if (number < 10 ** 4)
    return new Intl.NumberFormat().format(parseFloat(toPrecision(number, 1)));

  const decimalsDivisor = 10 ** 1; // 1 decimal place

  let result = String(number);

  for (let i = units.length - 1; i >= 0; i--) {
    const size = 10 ** ((i + 1) * 3);

    if (size <= number) {
      number = (number * decimalsDivisor) / size / decimalsDivisor;

      result = toPrecision(number, 1) + units[i];

      break;
    }
  }

  return result;
}
