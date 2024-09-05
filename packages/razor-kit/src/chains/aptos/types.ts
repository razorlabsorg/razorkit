/**
 * Represents a chain in the Aptos network.
 *
 * @property {string} id - The ID of the chain.
 * @property {string} name - The name of the chain.
 * @property {string} rpcUrl - The RPC URL of the chain.
 */
export type AptosChain = {
  id: string;
  name: string;
  rpcUrl: string;
}