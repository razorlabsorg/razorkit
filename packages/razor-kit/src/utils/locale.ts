/**
 * Returns the locale of the user's browser, if available.
 *
 * This function first checks if the user's browser provides an array of
 * preferred languages via `navigator.languages`. If so, it returns the first
 * language in the array. If not, it checks if the browser provides a single
 * language via `navigator.language`. If that is also unavailable, it returns
 * `undefined`.
 *
 * @return {string | undefined} The detected locale, or `undefined` if not
 * available.
 */
export const detectedBrowserLocale = () => {
  if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
    if (navigator.languages?.length) {
      return navigator.languages[0];
    }

    if (navigator.language) {
      return navigator.language;
    }
  }
};
