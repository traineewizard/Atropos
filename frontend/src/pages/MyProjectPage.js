import React, { useState } from "react";
import Web3 from "web3";
import { useWallet } from "use-wallet";
import GithubRepoConfig from "../components/GithubRepoConfig";
import GithubRepoInfo from "../components/GithubRepoInfo";
import SequenceLeftTitle from "../components/SequenceTitleLeft";
import MileStoneRewardConfig from "../components/MileStoneRewardConfig";
import CompleteConfig from "../components/CompleteConfig";
import BeneficiaryConfig from "../components/BeneficiaryConfig";
import { contractAbi } from "../utils/contractAbi";
import { contractByteCode } from "../utils/contractByteCode";
import { constFlag } from "../utils/constFlag";

function MyProjectPage({ provider, jumpPageCallback, contractDeployCallback }) {
  const [currStep, setCurrStep] = useState(1); // start from 1
  const wallet = useWallet();
  const [repoUrl, setRepoUrl] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [milestoneRewardArray, setMilestoneRewardArray] = useState([]); //  [{ title: "", issue: 0, reward: 0 }, { title: "", issue: 0, reward: 0 }, ...]

  const handleBackClick = () => {
    setCurrStep(() => {
      return currStep - 1;
    });
  };

  const handleNextClick = () => {
    setCurrStep(() => {
      return currStep + 1;
    });
  };

  const handleSetRepoUrl = (res) => {
    setRepoUrl(res);
  };

  const handleSetProjectTitle = (res) => {
    setProjectTitle(res);
  };

  const handleSetBneneficiary = (res) => {
    setBeneficiary(res);
  };

  const handeSetDuration = (res) => {
    setDuration(res);
  };

  const handleComplete = async () => {
    let milestoneIndexArray = [];
    let rewardArrayBn = [];
    let totalReward = 0;
    let totalRewardBn;
    let durationTimestamp;
    let web3 = new Web3(provider);

    milestoneRewardArray.forEach((item, index) => {
      milestoneIndexArray.push(index);
      rewardArrayBn.push(web3.utils.toWei(item.reward.toString(), "ether"));
      totalReward = totalReward + parseFloat(item.reward);
    });
    totalRewardBn = web3.utils.toWei(totalReward.toString(), "ether");

    let dateArray = duration.toString().split("-");
    let dateInMileSecond = new Date(
      dateArray[0],
      dateArray[1] - 1,
      dateArray[2]
    );
    durationTimestamp = parseFloat(
      dateInMileSecond.getTime() / 1000
    ).toString();

    console.log(
      JSON.stringify({
        expiration: durationTimestamp,
        beneficiary: beneficiary,
        url: repoUrl,
        milestones: milestoneIndexArray,
        rewards: rewardArrayBn,
        totalRewards: totalRewardBn,
      })
    );

    let contractObj = new web3.eth.Contract(contractAbi);
    await contractObj
      .deploy({
        data: contractByteCode,
        arguments: [
          durationTimestamp,
          beneficiary,
          repoUrl,
          milestoneIndexArray,
          rewardArrayBn,
          totalRewardBn,
        ],
      })
      .send({ from: wallet.account })
      .on("error", (error) => {
        console.log(error);
      })
      .on("transactionHash", (transactionHash) => {
        console.log(transactionHash);
      })
      .on("receipt", function (receipt) {
        console.log(receipt.contractAddress); // contains the new contract address
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        console.log(confirmationNumber, receipt);
      })
      .then(function (newContractInstance) {
        console.log(newContractInstance.options.address);

        // instance with the new contract address
        contractDeployCallback(
          newContractInstance.options.address,
          milestoneRewardArray,
          duration
        );
        jumpPageCallback(constFlag.pageProjectDetail);
      });
  };

  const handleSetMilestoneRewardArrayCallback = (res) => {
    setMilestoneRewardArray(res);
  };

  return (
    <div>
      <div className=" text-title-blue font-medieum text-2xl">
        Start a Project
      </div>
      <div className="grid grid-cols-1 divide-y divide-divide-gray ">
        <div className="text-title-gray py-3 mb-5">
          Follow the simple 5 steps to start a task!
        </div>

        <div className="grid grid-cols-3 divide-x divide-divide-gray">
          <SequenceLeftTitle step={currStep}></SequenceLeftTitle>
          <div className="pt-20 pl-20 col-span-2">
            <GithubRepoConfig
              step={currStep}
              repoUrlCallback={handleSetRepoUrl}
              nextCallback={handleNextClick}
            ></GithubRepoConfig>
            <GithubRepoInfo
              step={currStep}
              backCallback={handleBackClick}
              nextCallback={handleNextClick}
              projectTitleCallback={handleSetProjectTitle}
              durationCallback={handeSetDuration}
              milestoneRewardCallback={handleSetMilestoneRewardArrayCallback}
            ></GithubRepoInfo>
            <MileStoneRewardConfig
              step={currStep}
              backCallback={handleBackClick}
              nextCallback={handleNextClick}
              milestoneRewardArray={milestoneRewardArray}
              milestoneRewardCallback={handleSetMilestoneRewardArrayCallback}
            ></MileStoneRewardConfig>
            <BeneficiaryConfig
              step={currStep}
              backCallback={handleBackClick}
              nextCallback={handleNextClick}
              configBeneficiaryCallback={handleSetBneneficiary}
            ></BeneficiaryConfig>
            <CompleteConfig
              step={currStep}
              projectTile={projectTitle}
              duration={duration}
              milestoneRewardArray={milestoneRewardArray}
              beneficiary={beneficiary}
              backCallback={handleBackClick}
              compelteCallback={handleComplete}
            ></CompleteConfig>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProjectPage;
