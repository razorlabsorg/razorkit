import type { CreateConnectorFn } from "wagmi";
import type { WalletList } from "./Wallet";
import { ConnectorsForWalletsParameters, connectorsForWallets } from "./connectorsForWallets";
import { razorWallet } from "./walletConnectors/razorWallet/razorWallet";
import { coinbaseWallet } from "./walletConnectors/coinbaseWallet/coinbaseWallet";
import { metaMaskWallet } from "./walletConnectors/metaMaskWallet/metaMaskWallet";
import { walletConnectWallet } from "./walletConnectors/walletConnectWallet/walletConnectWallet";

export function getDefaultWallets(parameters: ConnectorsForWalletsParameters): {
  connectors: CreateConnectorFn[];
  wallets: WalletList;
};

export function getDefaultWallets(): { wallets: WalletList };

export function getDefaultWallets(parameters?: ConnectorsForWalletsParameters) {
  const wallets: WalletList = [
    {
      groupName: "Popular",
      wallets: [razorWallet, coinbaseWallet, metaMaskWallet, walletConnectWallet],
    },
  ];

  if (parameters) {
    return {
      connectors: connectorsForWallets(wallets, parameters),
      wallets,
    };
  }

  return { wallets };
}
