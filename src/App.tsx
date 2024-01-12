/* eslint-disable @typescript-eslint/no-explicit-any */
// import { TransactionBlock } from "@mysten/sui.js/transactions";
// import { useAccountBalance } from "./hooks/useAccountBalance";
// import { useWallet } from "./hooks/useWallet";

/* const sampleNft = new Map([
  [
    'm2:devnet',
    '0x2f60e33e33a1c880e8749073c5ef89288cf4df8974d8b872dfd72bc6c58f1172::nft::mint',
  ],
]); */

function App() {
  // const wallet = useWallet();
  // const { balance } = useAccountBalance();

  /* async function handleExecuteMoveCall(target: string | undefined) {
    if (!target) return;
    try {
      const tx = new TransactionBlock();
      tx.moveCall({
        target: target as any,
        arguments: [
          tx.pure("Razor NFT"),
          tx.pure("Razor Sample NFT"),
          tx.pure(
            "https://ipfs.io/ipfs/QmYbAuxRGdSgNsfDopufzRrXsXfeuRsMnd1T1JR7qdi5Kn"
          ),
        ],
      });
      const resData = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      });
      console.log("executeMoveCall success", resData);
      alert("executeMoveCall succeeded (see response in the console)");
    } catch (e) {
      console.error("executeMoveCall failed", e);
      alert("executeMoveCall failed (see response in the console)");
    }
  } */

  /* async function handleSignPersonalMessage() {
    if (!wallet.account) return;

    try {
      const msg = "Hello world!";
      const result = await wallet.signPersonalMessage({
        message: new TextEncoder().encode(msg),
      });
      const isValid = await wallet.verifySignedMessage(
        result,
        wallet.account.publicKey
      );
      console.log("verify signedMessage", isValid);
      alert("signMessage succeeded (see response in the console)");
    } catch (e) {
      console.error("signMessage failed", e);
      alert("signMessage failed (see response in the console)");
    }
  } */

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      
    </div>
  );
}

export default App;
