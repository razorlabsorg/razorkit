export function extractAddressFromType(type: string) {
  const res = type.split('::')[0];
  return res!;
}

export function composeType(address: string, generics: string[]): string;
export function composeType(
  address: string,
  struct: string,
  generics?: string[]
): string;
export function composeType(
  address: string,
  module: string,
  struct: string,
  generics?: string[]
): string;

export function composeType(address: string, ...args: unknown[]): string {
  const generics: string[] = Array.isArray(args[args.length - 1])
    ? (args.pop() as string[])
    : [];
  const chains = [address, ...args].filter(Boolean);
  let result: string = chains.join('::');
  if (generics && generics.length) {
    result += `<${generics.join(',')}>`;
  }
  return result;
}

export function isAptosCoin(type: string) {
  if (type.startsWith('0x1::coin::CoinStore')) {
    return true;
  } else {
    return false;
  }
}

export function extractCoinType(inputString: string) {
  const regex = /0x1::(\w+::\w+)<(\w+)::(\w+::\w+)>/;
  const match = inputString.match(regex);

  if (match) {
    return `${match[2]}::${match[3]}`;
  }

  return null;
}
