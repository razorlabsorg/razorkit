import { Chain } from "./types";

export enum M2ChainId {
  DEV_NET = "m2:devnet",
}

export const M2DevnetChain: Chain = {
  id: M2ChainId.DEV_NET,
  name: "M2 Devnet",
  rpcUrl: "https://devnet.m2.movementlabs.xyz",
};

export const DefaultChains = [M2DevnetChain];
