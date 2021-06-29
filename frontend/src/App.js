import React, { useState, useEffect } from "react";
import { useWallet, UseWalletProvider } from "use-wallet";
function App() {
  const wallet = useWallet();
  const [provider, setProvider] = useState(null);
  const handleConnectClick = () => {
    wallet.connect();
  };

  const handleDisconnectClick = () => {
    wallet.reset();
  };

  useEffect(() => {
    setProvider(wallet.ethereum);
    console.log(provider); //TODO
  }, [wallet.status, wallet.ethereum]);

  return (
    <div className="container mx-auto font-serif mt-5 font-bold">
      <div className="text-2xl">Atropos</div>
      {wallet.status === "connected" ? (
        <div className="flex justify-between mt-2 items-center">
          <div> Wallet Address: {wallet.account}</div>
          <div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDisconnectClick}
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-green-500 hover:bg-green-700 mt-2 text-white font-bold py-2 px-4 rounded"
          onClick={handleConnectClick}
        >
          Connect
        </button>
      )}
    </div>
  );
}

const WalletApp = () => {
  return (
    <UseWalletProvider
      chainId={(1, 3)}
      connectors={{
        // This is how connectors get configured
        portis: {
          dAppId: "",
        },
      }}
    >
      <App />
    </UseWalletProvider>
  );
};

export default WalletApp;
