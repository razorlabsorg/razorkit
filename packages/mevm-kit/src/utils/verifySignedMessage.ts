import {
  SuiSignMessageOutput,
  SuiSignPersonalMessageOutput,
} from '@mysten/wallet-standard';
import { verifyPersonalMessageSignature } from '@mysten/sui/verify';
import { has } from './check/has';
import { stringBytesToUint8Array } from './stringBytesToUint8Array';
import { Uint8arrayTool } from './binary';

/**
 * Verify a signed message based on Sui standard.
 *
 * @param {SuiSignPersonalMessageOutput | SuiSignMessageOutput} input - The signed message input. It should be either SuiSignPersonalMessageOutput or SuiSignMessageOutput.
 * @param {Uint8Array} publicKey - The public key used for verification.
 * @return {Promise<boolean>} A promise that resolves to a boolean indicating whether the signature is valid or not.
 * @throws {Error} If the input is neither SuiSignPersonalMessageOutput nor SuiSignMessageOutput.
 */
export async function verifySignedMessage(
  input: SuiSignPersonalMessageOutput | SuiSignMessageOutput,
  publicKey: Uint8Array,
): Promise<boolean> {
  let message: string;
  if (has(input, 'bytes')) {
    message = (input as SuiSignPersonalMessageOutput).bytes;
  } else if (has(input, 'messageBytes')) {
    message = (input as SuiSignMessageOutput).messageBytes;
  } else {
    throw new Error(
      'input should be either SuiSignPersonalMessageOutput or SuiSignMessageOutput',
    );
  }
  try {
    const parsedPublicKey = await verifyPersonalMessageSignature(
      stringBytesToUint8Array(message),
      input.signature,
    );
    return Uint8arrayTool.bytesEqual(parsedPublicKey.toRawBytes(), publicKey);
  } catch {
    return false;
  }
}
