import { CoinUtil } from '../lib';

/**
 * Represents a CoinObject as a Data Transfer Object.
 *
 * @property {string} objectId - The ID of the coin object.
 * @property {string} symbol - The symbol of the coin.
 * @property {bigint} balance - The balance of the coin.
 * @property {string} typeArg - The type argument of the coin.
 */
export type CoinObjectDto = {
  objectId: string;
  symbol: string;
  balance: bigint;
  typeArg: string;
};

/**
 * Represents a CoinObject.
 */
export class SuiCoinObject {
  /**
   * The ID of the coin object.
   */
  private _objectId: string;

  /**
   * The type argument of the coin.
   */
  private _typeArg: string;

  /**
   * The balance of the coin.
   */
  private _balance: bigint;

  /**
   * The symbol of the coin.
   */
  private _symbol: string;

  /**
   * Create a new CoinObject.
   *
   * @param {string} objectId - The ID of the coin object.
   * @param {string} typeArg - The type argument of the coin.
   * @param {bigint} balance - The balance of the coin.
   */
  constructor(objectId: string, typeArg: string, balance: bigint) {
    this._objectId = objectId;
    this._balance = balance;
    this._typeArg = typeArg;
    this._symbol = CoinUtil.getCoinSymbol(typeArg);
  }

  /**
   * Get the ID of the coin object.
   *
   * @returns {string} The ID of the coin object.
   */
  get objectId(): string {
    return this._objectId;
  }

  /**
   * Get the type argument of the coin.
   *
   * @returns {string} The type argument of the coin.
   */
  get typeArg(): string {
    return this._typeArg;
  }

  /**
   * Get the balance of the coin.
   *
   * @returns {bigint} The balance of the coin.
   */
  get balance(): bigint {
    return this._balance;
  }

  /**
   * Get the symbol of the coin.
   *
   * @returns {string} The symbol of the coin.
   */
  get symbol(): string {
    return this._symbol;
  }

  /**
   * Create a new CoinObject from a CoinObjectDto.
   *
   * @param {CoinObjectDto} obj - The CoinObjectDto to create the CoinObject from.
   * @returns {CoinObject} The created CoinObject.
   */
  static fromDto(obj: CoinObjectDto): SuiCoinObject {
    return new SuiCoinObject(obj.objectId, obj.typeArg, obj.balance);
  }

  /**
   * Convert the CoinObject to a CoinObjectDto.
   *
   * @returns {CoinObjectDto} The converted CoinObjectDto.
   */
  toDto(): CoinObjectDto {
    return {
      objectId: this._objectId,
      balance: this._balance,
      typeArg: this._typeArg,
      symbol: this._symbol,
    };
  }

  /**
   * Convert the CoinObject to a string representation.
   *
   * @returns {string} The string representation of the CoinObject.
   */
  toString(): string {
    return JSON.stringify(this.toDto());
  }
}
