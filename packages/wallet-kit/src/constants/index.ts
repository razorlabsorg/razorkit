export enum QueryKey {
  MOVE_COIN_BALANCE = `RAZOR_MOVE_COIN_BALANCE`,
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function queryKey(key: string, opts: Record<string, any>) {
  const uriQuery = new URLSearchParams(opts);
  return key + '?' + uriQuery.toString();
}
