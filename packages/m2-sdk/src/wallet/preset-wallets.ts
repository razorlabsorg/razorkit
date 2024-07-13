import { IDefaultWallet } from './types';

/**
 * A function that defines a wallet by freezing the provided parameters.
 *
 * @param {IDefaultWallet} params - The parameters to define the wallet.
 * @return {IDefaultWallet} The frozen wallet parameters.
 */
export function defineWallet(params: IDefaultWallet) {
  return Object.freeze(params);
}

// register names of wallet adapters, used for detection
export enum PresetWallet {
  RAZOR_SUI_WALLET = 'Razor Wallet',
  SUI_WALLET = 'Sui Wallet',
  ETHOS_WALLET = 'Ethos Wallet',
  MARTIAN_WALLET = 'Martian Wallet',
}

export const RazorSuiWallet = defineWallet({
  name: PresetWallet.RAZOR_SUI_WALLET,
  label: 'Razor Wallet',
  iconUrl:
    'data:image/png;base64,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',
  downloadUrl: {
    browserExtension:
      'https://chromewebstore.google.com/detail/razor-wallet/fdcnegogpncmfejlfnffnofpngdiejii',
  },
});

export const SuiWallet = defineWallet({
  name: PresetWallet.SUI_WALLET,
  label: 'Sui Wallet',
  iconUrl:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAIVBMVEUAAAD////////9/f39/f3+/v7x+Pz///95wfGj1PXI5fgEMJeQAAAAB3RSTlMAECNgmNr40ET05wAAAOBJREFUeNplUksOgjAQbYw38LdloQdw5VZJDGuNiWtXdGvUFjlAtT2AVC4AekrLvKKYvoTMm5fpfGGswWCdit2cfTFNZYO49YfSYwW/t2+FS0TCTH6x/Q/wISPZwcYJSVc4uxdg1wI2Yn0QbmCXbAKin7AHtiCbq6wicvI5syK/+azowlZSoxNGc4l7IWswhqKlagtD4Kl9CAWBAmspbGHwhJK+HDMlkiaIcJ9BWWqMu64yhcbGVMU5nKoc/XC2fGs/HMbPra78+MGCwhUGSw7OEB4qOKU7Nrki/p2/8zt8ABpiv63tyiOHAAAAAElFTkSuQmCC',
  downloadUrl: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil',
  },
});

export const EthosWallet = defineWallet({
  name: PresetWallet.ETHOS_WALLET,
  label: 'Ethos Wallet',
  iconUrl:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMjAwIiB2aWV3Qm94PSIwIDAgMTIwMCAxMjAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMjAwIiBmaWxsPSIjRjRFRkZGIi8+CjxwYXRoIGQ9Ik0zNzAuMjU3IDM0My4yMTlINzI1LjE5Qzc1NC4wMTkgMzQzLjIxOSA3NzcuMzg4IDM2Ni45MzYgNzc3LjM4OCAzOTYuMTkyVjgwNy43MTlDNzc3LjM4OCA4MzYuOTc2IDc1NC4wMTggODYwLjY5MiA3MjUuMTkgODYwLjY5MkgzNzAuMjU2QzM0MS40MjggODYwLjY5MiAzMTguMDU4IDgzNi45NzYgMzE4LjA1OCA4MDcuNzE5VjM5Ni4xOTJDMzE4LjA1OCAzNjYuOTM2IDM0MS40MjggMzQzLjIxOSAzNzAuMjU3IDM0My4yMTlaIiBmaWxsPSIjRDdCOEZGIi8+CjxwYXRoIGQ9Ik0zNzcuMzc2IDM0Ny4yMjVMNjI3LjY3NCA0NjUuNDIxQzY0Mi40IDQ3Mi4zNzUgNjUxLjgxNiA0ODcuMzYyIDY1MS44MTYgNTAzLjg0NFY5MzAuMjlDNjUxLjgxNiA5NjAuOTU1IDYyMC43MTYgOTgxLjQ2OSA1OTMuMTAyIDk2OS4wMThMMzQyLjgwNCA4NTYuMTU5QzMyNy43MjEgODQ5LjM1OSAzMTggODM0LjE4MSAzMTggODE3LjQzMVYzODUuNjQ4QzMxOCAzNTQuNjYzIDM0OS42OTUgMzM0LjE1MyAzNzcuMzc2IDM0Ny4yMjVaIiBmaWxsPSIjOUE0MkZGIi8+CjxwYXRoIGQ9Ik04NTQuOTE2IDE5Nkw4NjAuMTQzIDIxMC4xMjVDODcyLjQ1NSAyNDMuNCA4OTguNjkxIDI2OS42MzUgOTMxLjk2NiAyODEuOTQ4TDk0Ni4wOTEgMjg3LjE3NUw5MzEuOTY2IDI5Mi40MDFDODk4LjY5MSAzMDQuNzE0IDg3Mi40NTUgMzMwLjk1IDg2MC4xNDMgMzY0LjIyNUw4NTQuOTE2IDM3OC4zNDlMODQ5LjY4OSAzNjQuMjI1QzgzNy4zNzYgMzMwLjk1IDgxMS4xNDEgMzA0LjcxNCA3NzcuODY2IDI5Mi40MDFMNzYzLjc0MSAyODcuMTc1TDc3Ny44NjYgMjgxLjk0OEM4MTEuMTQxIDI2OS42MzUgODM3LjM3NiAyNDMuNCA4NDkuNjg5IDIxMC4xMjVMODU0LjkxNiAxOTZaIiBmaWxsPSIjOUE0MkZGIi8+Cjwvc3ZnPgo=',
  downloadUrl: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/ethos-sui-wallet/mcbigmjiafegjnnogedioegffbooigli',
  },
});

export const MartianWallet = defineWallet({
  name: PresetWallet.MARTIAN_WALLET,
  label: 'Martian Wallet',
  iconUrl: 'https://cdn.martianwallet.xyz/assets/icon.png',
  downloadUrl: {
    browserExtension:
      'https://chrome.google.com/webstore/detail/martian-wallet-aptos-sui/efbglgofoippbgcjepnhiblaibcnclgk',
  },
});
