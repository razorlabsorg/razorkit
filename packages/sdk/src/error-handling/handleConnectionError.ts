import { ErrorCode } from './constants';
import { PresetWallet } from '../wallet';

export interface WalletErrorRes {
  code: ErrorCode;
  message: string;
  details: Record<string, any>;
}

export function handleConnectionError(
  e: Error,
  wallet: string,
): WalletErrorRes {
  let code = ErrorCode.WALLET__CONNECT_ERROR; // default error
  const message = e.message;
  switch (wallet) {
    case PresetWallet.RAZOR_WALLET:
    case PresetWallet.BITGET:
    case PresetWallet.OKX:
    case PresetWallet.NIGHTLY_WALLET:
    case PresetWallet.LEAP_WALLET:
      if (message.includes('User rejects approval')) {
        code = ErrorCode.WALLET__CONNECT_ERROR__USER_REJECTED;
      }
      break;
  }
  return {
    code,
    message,
    details: {
      wallet: wallet,
    },
  };
}
