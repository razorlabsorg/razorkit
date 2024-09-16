import { Connector, CreateConnectorFn } from "wagmi";
import { WalletConnectParameters } from "wagmi/connectors";
import { CoinbaseWalletOptions } from "./walletConnectors/coinbaseWallet/coinbaseWallet";
import { WalletConnectWalletOptions } from "./walletConnectors/walletConnectWallet/walletConnectWallet";

export type InstructionStepName = "install" | "create" | "scan" | "connect" | "refresh";
export type Instruction = {
  learnMoreUrl: string;
  steps: {
    step: InstructionStepName;
    title: string;
    description: string;
  }[];
};

type MevmKitConnector = {
  mobile?: {
    getUri?: (uri: string) => string;
  };
  desktop?: {
    getUri?: (uri: string) => string;
    instructions?: Instruction;
  };
  qrCode?: {
    getUri: (uri: string) => string;
    instructions?: Instruction;
  };
  extension?: {
    instructions?: Instruction;
  };
};

export type Wallet = {
  id: string;
  name: string;
  rdns?: string;
  shortName?: string;
  iconUrl: string | (() => Promise<string>);
  iconAccent?: string;
  iconBackground: string;
  installed?: boolean;
  downloadUrls?: {
    android?: string;
    ios?: string;
    mobile?: string;
    qrCode?: string;
    chrome?: string;
    edge?: string;
    firefox?: string;
    opera?: string;
    safari?: string;
    browserExtension?: string;
    macos?: string;
    windows?: string;
    linux?: string;
    desktop?: string;
  };
  hidden?: () => boolean;
  createConnector: (walletDetails: WalletDetailsParams) => CreateConnectorFn;
} & MevmKitConnector;

export interface DefaultWalletOptions {
  projectId: string;
  walletConnectParameters?: MevmKitWalletConnectParameters;
}

export type CreateWalletFn = (
  // These parameters will be used when creating a wallet. If injected
  // wallet doesn't have parameters it will just ignore these passed in parameters
  createWalletParams: CoinbaseWalletOptions & Omit<WalletConnectWalletOptions, "projectId"> & DefaultWalletOptions
) => Wallet;

export type WalletList = {
  groupName: string;
  wallets: CreateWalletFn[];
}[];

// We don't want users to pass in `showQrModal` or `projectId`.
// Those two values are handled by mevmkit. The rest of WalletConnect
// parameters can be passed with no issue
export type MevmKitWalletConnectParameters = Omit<WalletConnectParameters, "showQrModal" | "projectId">;

export type MevmKitDetails = Omit<Wallet, "createConnector" | "hidden"> & {
  index: number;
  groupIndex: number;
  groupName: string;
  isWalletConnectModalConnector?: boolean;
  isMevmKitConnector: boolean;
  walletConnectModalConnector?: Connector;
  // Used specifically in `connectorsForWallets` logic
  // to make sure we can also get WalletConnect modal in mevmkit
  showQrModal?: true;
};

export type WalletDetailsParams = { mkDetails: MevmKitDetails };

export type CreateConnector = (walletDetails: { mkDetails: MevmKitDetails }) => CreateConnectorFn;

// This is the default connector you get at first from wagmi
// "Connector" + mevmkit details we inject into the connector
export type WagmiConnectorInstance = Connector & {
  // this is optional since we only get
  // mkDetails if we use mevmkit connectors
  mkDetails?: MevmKitDetails;
};

// This will be the wallet instance we will return
// in the mevmkit connect modal
export type WalletInstance = Connector & MevmKitDetails;
