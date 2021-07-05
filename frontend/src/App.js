import React, { useState, useEffect } from "react";
import { useWallet, UseWalletProvider } from "use-wallet";
import MainPage from "./pages/MainPage";
import MyProjectPage from "./pages/MyProjectPage";

import { constFlag } from "./utils/constFlag";

function App() {
  const wallet = useWallet();
  const [provider, setProvider] = useState(null);
  const [currPage, setCurrPage] = useState(constFlag.pageMain);

  const handleConnectClick = () => {
    wallet.connect();
  };

  const handleDisconnectClick = () => {
    wallet.reset();
  };

  const jumpPage = (page) => {
    setCurrPage(page);
  };

  useEffect(() => {
    setProvider(wallet.ethereum);
  }, [wallet.status, wallet.ethereum]);

  return (
    <div>
      <div className="grid grid-cols-3 items-center bg-nav-gray h-20">
        <div className="ml-20 text-xl">
          {currPage === constFlag.pageMyProject && "My Projects"}
        </div>
        <div className="grid justify-items-center">
          <img alt="logo" className="h-12" src="/atropos.png"></img>
        </div>

        {wallet.status === "connected" ? (
          <div className="flex justify-end my-2 mr-2 items-center">
            <div className="text-sm">{wallet.account}</div>
            <div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold ml-2 py-2 px-4 rounded"
                onClick={handleDisconnectClick}
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-end">
            <button
              className="my-2 mr-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleConnectClick}
            >
              Connect
            </button>
          </div>
        )}
      </div>
      <div className="container mx-auto  mt-12 h-full">
        {wallet.status === "connected" ? (
          <>
            {currPage === constFlag.pageMain && (
              <MainPage
                jumpPageCallback={jumpPage}
                provider={provider}
              ></MainPage>
            )}
            {currPage === constFlag.pageMyProject && (
              <MyProjectPage></MyProjectPage>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center  ">
            <div className="text-xl">Please unlock wallet</div>
          </div>
        )}
      </div>
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
