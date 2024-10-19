const storageKey = 'WALLETCONNECT_DEEPLINK_CHOICE';

/**
 * Sets the deep link for WalletConnect.
 * @param {Object} params - The parameters for setting the deep link.
 * @param {string} params.mobileUri - The mobile URI of the deep link.
 * @param {string} params.name - The name of the deep link.
 * @returns {void}
 */
export function setWalletConnectDeepLink({
  mobileUri,
  name,
}: {
  mobileUri: string;
  name: string;
}): void {
  localStorage.setItem(
    storageKey,
    JSON.stringify({
      href: mobileUri.split('?')[0],
      name,
    }),
  );
}

/**
 * Clears the deep link choice for WalletConnect from local storage.
 *
 * @return {void} No return value.
 */
export function clearWalletConnectDeepLink(): void {
  localStorage.removeItem(storageKey);
}
