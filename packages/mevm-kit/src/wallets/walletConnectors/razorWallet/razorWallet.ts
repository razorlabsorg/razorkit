import { Wallet } from "../../Wallet";
import { getInjectedConnector, hasInjectedProvider } from "../../getInjectedConnector";

export const razorWallet = (): Wallet => ({
  id: "razor",
  name: "Razor Wallet",
  iconUrl: async () => (await import("./razorWallet.svg")).default,
  rdns: "xyz.razorwallet",
  iconBackground: "#8697FF",
  installed: hasInjectedProvider({ namespace: "razor" }),
  downloadUrls: {
    chrome: "https://chromewebstore.google.com/detail/razor-wallet/fdcnegogpncmfejlfnffnofpngdiejii",
    browserExtension: "https://razorwallet.xyz/",
  },
  extension: {
    instructions: {
      learnMoreUrl: "https://razorwallet.xyz/",
      steps: [
        {
          description: "wallet_connectors.razor.extension.step1.description",
          step: "install" as const,
          title: "wallet_connectors.razor.extension.step1.title",
        },
        {
          description: "wallet_connectors.razor.extension.step2.description",
          step: "create" as const,
          title: "wallet_connectors.razor.extension.step2.title",
        },
        {
          description: "wallet_connectors.razor.extension.step3.description",
          step: "refresh" as const,
          title: "wallet_connectors.razor.extension.step3.title",
        },
      ],
    },
  },
  createConnector: getInjectedConnector({ namespace: "razor" }),
});
