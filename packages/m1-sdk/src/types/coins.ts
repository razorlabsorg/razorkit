import { Types } from 'aptos';

export type CoinStoreResult = {
  coin: {
    value: string;
  };
  deposit_events: {
    counter: string;
    guid: {
      id: {
        addr: string;
        creation_num: string;
      };
    };
  };
  frozen: boolean;
  withdraw_events: {
    counter: string;
    guid: {
      id: {
        addr: string;
        creation_num: string;
      };
    };
  };
};

export type AptosResource<T = unknown> = {
  data: T;
  type: string;
};

export type address = string;

export type CoinInfoResource = {
  decimals: number;
  name: string;
  supply: {
    vec: [
      {
        aggregator: {
          vec: [
            {
              handle: address;
              key: address;
              limit: string;
            },
          ];
        };
        integer: {
          vec: [
            {
              limit: string;
              value: string;
            },
          ];
        };
      },
    ];
  };
  symbol: string;
};

export type CoinStoreResource = {
  coin: {
    value: string;
  };
  deposit_events: {
    counter: string;
    guid: {
      id: {
        addr: address;
        creation_num: string;
      };
    };
  };
  frozen: boolean;
  withdraw_events: {
    counter: string;
    guid: {
      id: {
        addr: address;
        creation_num: string;
      };
    };
  };
};

export interface TransactionResponse {
  success: boolean;
  status: string;
  hash: string;
}

export interface SimulateTransactionResponse {
  success: boolean;
  data: Types.UserTransaction;
}

type Vec<T = undefined> = {
  vec: Array<T>;
};

// Custom vec type supply
type Supply = Vec<{
  aggregator: Vec;
  integer: Vec<{
    limit: string;
    value: string;
  }>;
}>;

export type CoinResourceResponse = {
  decimals: number;
  symbol: string;
  name: string;
  supply: Supply;
};

export type FetchCoinResult = {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  supply?: string;
};

interface CoinData {
  name: string;
  symbol: string;
  decimals: number;
  balance?: string;
}

export interface AptosCoin {
  type: string;
  data: CoinData;
}
