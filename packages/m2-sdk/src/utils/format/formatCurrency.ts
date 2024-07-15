const MILLION = 1_000_000;
const BILLION = 1_000_000_000;
const TRILLION = 1_000_000_000_000;

/**
 * Formats SUI Amount.
 *
 * @param {number | string | bigint} amount - The amount to format.
 * @param {object} options - An optional object containing formatting options.
 * @param {boolean} options.withAbbr - Flag to indicate if abbreviation should be used.
 * @return {string} The formatted SUI amount.
 */
export function formatSUI(
  amount: number | string | bigint,
  options?: {
    withAbbr?: boolean;
  },
): string {
  return formatCurrency(
    amount,
    Object.assign(
      {
        decimals: 9,
      },
      options,
    ),
  );
}

/**
 * Formats currency based on the amount and options provided.
 *
 * @param {number | string | bigint} amount - The amount to format.
 * @param {object} options - An optional object containing formatting options.
 * @param {number} options.decimals - The number of decimal places to display.
 * @param {boolean} options.withAbbr - Flag to indicate if abbreviation should be used.
 * @return {string} The formatted currency string.
 */
export function formatCurrency(
  amount: number | string | bigint,
  options?: {
    decimals?: number;
    withAbbr?: boolean;
  },
): string {
  const { decimals = 0, withAbbr = true } = options ?? {};
  // handle bigint that exceeds safe integer range
  if (typeof amount === 'bigint' && !isSafeToConvertToNumber(amount)) {
    return formatCurrencyBigInt(BigInt(amount), {
      decimals,
      withAbbr,
    });
  }
  // else, convert to number for formatting logic
  if (Number(amount) === 0) return '0';
  if (Number(amount) < 0) {
    return '-' + formatCurrency(-Number(amount), options);
  }
  const _amount = Number(amount) / 10 ** decimals;
  if (_amount > 0 && _amount < 1) {
    return formatSmallCurrency(_amount);
  }
  return format(_amount, withAbbr);
}

/**
 * Formats the amount.
 *
 * @param {number | bigint} amount - The amount to format.
 * @param {boolean} showAbbr - Flag to determine if abbreviations should be used.
 * @return {string} The formatted amount with or without abbreviations.
 */
function format(amount: number | bigint, showAbbr: boolean): string {
  if (showAbbr) {
    if (amount >= MILLION && amount < BILLION)
      return formatWithAbbr(amount, MILLION, 'M');
    if (amount >= BILLION && amount < TRILLION)
      return formatWithAbbr(amount, BILLION, 'B');
    if (amount >= TRILLION) return formatWithAbbr(amount, TRILLION, 'T');
  }

  return Intl.NumberFormat('en-US').format(amount);
}

/**
 * Formats the given amount with abbreviations.
 *
 * @param {number | bigint} amount - The amount to format.
 * @param {number} measureUnit - The unit of measurement.
 * @param {string} abbrSymbol - The abbreviation symbol.
 * @return {string} The formatted amount with abbreviations.
 */
function formatWithAbbr(
  amount: number | bigint,
  measureUnit: number,
  abbrSymbol: string,
): string {
  let _amount: string;
  if (typeof amount === 'bigint') {
    _amount = String(amount / (BigInt(measureUnit) / 1000n));
  } else {
    _amount = String(Math.floor(amount / (measureUnit / 1000)));
  }
  const showAmount = _amount.padEnd(4, '0');
  const result = Intl.NumberFormat('en-US').format(Number(showAmount));
  return result.replace(',', '.') + abbrSymbol;
}

/**
 * Formats a small currency amount (when amount < 1).
 *
 * @param {number} amount - The amount to format.
 * @return {string} The formatted amount as a string.
 */
function formatSmallCurrency(amount: number) {
  if (amount <= 0) return '0';

  const fixNum = Math.ceil(-Math.log10(amount));

  let minimalDigits = 0;
  for (; Number(amount) % Math.pow(10, minimalDigits) === 0; ) {
    minimalDigits = minimalDigits + 1;
  }

  // if both last 2 digits are 0
  if (
    Number(amount) % Math.pow(10, 10 - (fixNum + 2)) === 0 &&
    Number(amount) % Math.pow(10, 10 - (fixNum + 1)) === 0
  ) {
    return toFixed(amount, fixNum);
  }

  // if only last 1 digit is 0
  if (
    Number(amount) % Math.pow(10, 10 - (fixNum + 2)) === 0 &&
    Number(amount) % Math.pow(10, 10 - (fixNum + 1)) !== 0
  ) {
    return toFixed(amount, fixNum + 1);
  }

  return toFixed(amount, fixNum + 2);
}

/**
 * A function that rounds a number to a fixed number of decimal places.
 *
 * @param {number} num - The number to be rounded
 * @param {number} fixed - The number of decimal places to round to
 * @return {string} The rounded number as a string
 */
function toFixed(num: number, fixed: number): string {
  function getFullNum(num: number) {
    // if not num
    if (isNaN(num)) {
      return num.toString();
    }

    // parse string no need to transform
    const str = '' + num;
    if (!/e/i.test(str)) {
      return num.toString();
    }

    return num.toFixed(18).replace(/\.?0+$/, '');
  }

  fixed = fixed || 0;
  fixed = Math.pow(10, fixed);
  return getFullNum(Math.floor(num * fixed) / fixed);
}

/**
 * Formats a currency amount represented as a bigint.
 *
 * @param {bigint} amount - The amount to format.
 * @param {object} options - An optional object containing formatting options.
 * @param {number} options.decimals - The number of decimal places to display.
 * @param {boolean} options.withAbbr - Flag to indicate if abbreviation should be used.
 * @return {string} The formatted currency string.
 */
function formatCurrencyBigInt(
  amount: bigint,
  options?: {
    decimals?: number;
    withAbbr?: boolean;
  },
): string {
  if (amount === 0n) return '0';
  if (amount < 0n) return '-' + formatCurrencyBigInt(-amount, options);

  const { decimals = 9, withAbbr = true } = options ?? {};
  const _amount = amount / 10n ** BigInt(decimals);
  return format(_amount, withAbbr);
}

/**
 * Checks if a given bigint value is safe to convert to a number.
 *
 * @param {bigint} bigintValue - The bigint value to be checked.
 * @return {boolean} Returns true if the bigint value is within the safe integer range, false otherwise.
 */
function isSafeToConvertToNumber(bigintValue: bigint) {
  const minValue = Number.MIN_SAFE_INTEGER; // -9007199254740991
  const maxValue = Number.MAX_SAFE_INTEGER; // 9007199254740991

  return bigintValue >= BigInt(minValue) && bigintValue <= BigInt(maxValue);
}
