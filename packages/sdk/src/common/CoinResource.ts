export type CoinResourceDto = {
  symbol: string;
  balance: bigint;
  typeArg: string;
};

export class CoinResource {
  private _typeArg: string;
  private _balance: bigint;
  private _symbol: string;

  constructor(typeArg: string, balance: bigint) {
    this._balance = balance;
    this._typeArg = typeArg;
    this._symbol = typeArg.substring(typeArg.lastIndexOf(':') + 1);
  }

  get typeArg() {
    return this._typeArg;
  }

  get balance() {
    return this._balance;
  }

  get symbol() {
    return this._symbol;
  }

  static fromDto(res: CoinResourceDto) {
    return new CoinResource(res.typeArg, res.balance);
  }

  toDto(): CoinResourceDto {
    return {
      balance: this._balance,
      typeArg: this._typeArg,
      symbol: this._symbol,
    };
  }

  toString(): string {
    return JSON.stringify(this.toDto());
  }
}
