/**
 * Represents a chain in the Sui network.
 *
 * @property {string} id - The ID of the chain.
 * @property {string} name - The name of the chain.
 * @property {string} rpcUrl - The RPC URL of the chain.
 */
export type Chain = {
  id: string;
  name: string;
  rpcUrl: string;
};
