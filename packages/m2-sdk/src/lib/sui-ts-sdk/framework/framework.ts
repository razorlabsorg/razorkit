import type { StructTag } from '@mysten/sui.js/bcs';
import { CoinStruct } from '@mysten/sui.js/client';
import {
  getObjectFields,
  getObjectId,
  getObjectType,
  SuiMoveObject,
  SuiObjectInfo,
  SuiObjectResponse,
} from '../types';
import { normalizeSuiObjectId } from '../utils';

export type ObjectData = ObjectDataFull | SuiObjectInfo;
export type ObjectDataFull = SuiObjectResponse | SuiMoveObject;
export const COIN_TYPE_ARG_REGEX = /^0x2::coin::Coin<(.+)>$/;

/**
 * Checks if the given `resp` is a full `ObjectData` or a `SuiObjectResponse`.
 *
 * @param {ObjectData | ObjectDataFull} resp - The response to check.
 * @return {resp is SuiObjectResponse} - Returns `true` if `resp` is a `SuiObjectResponse`, otherwise `false`.
 */
export function isObjectDataFull(
  resp: ObjectData | ObjectDataFull,
): resp is SuiObjectResponse {
  return !!(resp as SuiObjectResponse).data || !!(resp as SuiMoveObject).type;
}

/**
 * Utility class for 0x2::coin
 * as defined in https://github.com/MystenLabs/sui/blob/ca9046fd8b1a9e8634a4b74b0e7dabdc7ea54475/sui_programmability/framework/sources/CoinUtil.move#L4
 */
export class CoinUtil {
  /**
   * Checks if the given data is a coin based on the type.
   *
   * @param {ObjectData} data - The data to check if it represents a coin.
   * @return {boolean} Returns true if the data represents a coin, otherwise false.
   */
  static isCoin(data: ObjectData): boolean {
    return CoinUtil.getType(data)?.match(COIN_TYPE_ARG_REGEX) != null;
  }

  /**
   * Extracts the coin type from the given string representation of a type.
   *
   * @param {string} type - The string representation of a type.
   * @return {string | null} The extracted coin type, or null if no match is found.
   */
  static getCoinType(type: string): string | null {
    const [, res] = type.match(COIN_TYPE_ARG_REGEX) ?? [];
    return res || null;
  }

  /**
   * Retrieves the coin type argument from the given object data.
   *
   * @param {ObjectData} obj - The object data to extract the coin type argument from.
   * @return {string | null} The coin type argument, or null if it cannot be found.
   */
  static getCoinTypeArg(obj: ObjectData): string | null {
    const type = CoinUtil.getType(obj);
    return type ? CoinUtil.getCoinType(type) : null;
  }

  /**
   * Determines if the given object data represents a SUI coin object.
   *
   * @param {ObjectData} obj - The object data to check.
   * @return {boolean} Returns true if the object data represents a SUI coin, otherwise false.
   */
  static isSUI(obj: ObjectData): boolean {
    const arg = CoinUtil.getCoinTypeArg(obj);
    return arg ? CoinUtil.getCoinSymbol(arg) === 'SUI' : false;
  }

  /**
   * Retrieves the symbol of a coin based on the coin type argument.
   *
   * @param {string} coinTypeArg - The coin type argument containing the symbol.
   * @return {string} The extracted symbol of the coin.
   */
  static getCoinSymbol(coinTypeArg: string): string {
    return coinTypeArg.substring(coinTypeArg.lastIndexOf(':') + 1);
  }

  /**
   * Retrieves the struct tag of a coin based on the coin type argument.
   *
   * @param {string} coinTypeArg - The coin type argument to extract struct tag from.
   * @return {StructTag} The struct tag of the coin.
   */
  static getCoinStructTag(coinTypeArg: string): StructTag {
    return {
      address: normalizeSuiObjectId(coinTypeArg.split('::')[0]),
      module: coinTypeArg.split('::')[1],
      name: coinTypeArg.split('::')[2],
      typeParams: [],
    };
  }

  /**
   * Retrieves the ID from the given ObjectData.
   *
   * @param {ObjectData} obj - The object data to extract the ID from.
   * @return {string} The extracted ID.
   */
  public static getID(obj: ObjectData): string {
    if ('fields' in obj) {
      return obj.fields.id.id;
    }
    return getObjectId(obj);
  }

  /**
   * Calculates the total balance from an array of CoinStructs.
   *
   * @param {CoinStruct[]} coins - The array of CoinStructs.
   * @return {bigint} The total balance.
   */
  static totalBalance(coins: CoinStruct[]): bigint {
    return coins.reduce(
      (partialSum, c) => partialSum + CoinUtil.getBalanceFromCoinStruct(c),
      BigInt(0),
    );
  }

  /**
   * Sorts an array of CoinStructs based on their balance in ascending order.
   *
   * @param {CoinStruct[]} coins - The array of CoinStructs to be sorted.
   * @return {CoinStruct[]} The sorted array of CoinStructs.
   */
  static sortByBalance(coins: CoinStruct[]): CoinStruct[] {
    return [...coins].sort((a, b) =>
      CoinUtil.getBalanceFromCoinStruct(a) <
      CoinUtil.getBalanceFromCoinStruct(b)
        ? -1
        : CoinUtil.getBalanceFromCoinStruct(a) >
            CoinUtil.getBalanceFromCoinStruct(b)
          ? 1
          : 0,
    );
  }

  /**
   * Retrieves the balance from the given CoinStruct.
   *
   * @param {CoinStruct} coin - The CoinStruct to retrieve the balance from.
   * @return {bigint} The balance as a bigint.
   */
  static getBalanceFromCoinStruct(coin: CoinStruct): bigint {
    return BigInt(coin.balance);
  }

  /**
   * Retrieves the balance from the given ObjectDataFull.
   *
   * @param {ObjectDataFull} data - The ObjectDataFull to retrieve the balance from.
   * @return {bigint | undefined} The balance as a bigint, or undefined if the data is not a coin.
   */
  static getBalance(data: ObjectDataFull): bigint | undefined {
    if (!CoinUtil.isCoin(data)) {
      return undefined;
    }
    const balance = getObjectFields(data)?.balance;
    return BigInt(balance);
  }

  /**
   * Retrieves the type from the ObjectData.
   *
   * @param {ObjectData} data - The ObjectData to retrieve the type from.
   * @return {string | null | undefined} The type of the ObjectData.
   */
  private static getType(data: ObjectData): string | null | undefined {
    if (isObjectDataFull(data)) {
      return getObjectType(data);
    }
    return data.type;
  }
}
