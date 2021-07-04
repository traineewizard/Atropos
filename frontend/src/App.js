import React, { useState, useEffect } from "react";
import { useWallet, UseWalletProvider } from "use-wallet";
import GithubRepoConfig from "./components/GithubRepoConfig";
import GithubRepoInfo from "./components/GithubRepoInfo";
import SequenceLeftTitle from "./components/SequenceTitleLeft";
import MileStoneRewardConfig from "./components/MileStoneRewardConfig";
import CompleteConfig from "./components/CompleteConfig";

function App() {
  const wallet = useWallet();
  const [provider, setProvider] = useState(null);
  const [currStep, setCurrStep] = useState(4);

  const handleConnectClick = () => {
    wallet.connect();
  };

  const handleDisconnectClick = () => {
    wallet.reset();
  };

  const handleNextClick = () => {
    setCurrStep(() => {
      return currStep + 1;
    });
  };

  const handleBackClick = () => {
    setCurrStep(() => {
      return currStep - 1;
    });
  };

  useEffect(() => {
    setProvider(wallet.ethereum);
  }, [wallet.status, wallet.ethereum]);

  return (
    <div>
      <div className="grid grid-cols-3 items-center bg-nav-gray h-20">
        <div className="ml-20 text-xl">My Projects</div>
        <div className="grid justify-items-center">
          <div className="text-2xl ">Atropos</div>
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
          <div>
            <div className=" text-title-blue font-medieum text-2xl">
              Start a Project
            </div>
            <div className="grid grid-cols-1 divide-y divide-divide-gray ">
              <div className="text-title-gray py-3 mb-5">
                Follow the simple 3 steps to start a task!
              </div>

              <div className="grid grid-cols-3 divide-x divide-divide-gray">
                <SequenceLeftTitle step={currStep}></SequenceLeftTitle>
                <div className="pt-20 pl-20 col-span-2">
                  <GithubRepoConfig
                    step={currStep}
                    nextCallback={handleNextClick}
                  ></GithubRepoConfig>
                  <GithubRepoInfo
                    step={currStep}
                    backCallback={handleBackClick}
                    nextCallback={handleNextClick}
                  ></GithubRepoInfo>
                  <MileStoneRewardConfig
                    step={currStep}
                    backCallback={handleBackClick}
                    nextCallback={handleNextClick}
                  ></MileStoneRewardConfig>
                  <CompleteConfig
                    step={currStep}
                    backCallback={handleBackClick}
                    nextCallback={handleNextClick}
                  ></CompleteConfig>
                </div>
              </div>
            </div>
          </div>
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
