import React, { useEffect, useState } from "react";

import GithubRepoConfig from "../components/GithubRepoConfig";
import GithubRepoInfo from "../components/GithubRepoInfo";
import SequenceLeftTitle from "../components/SequenceTitleLeft";
import MileStoneRewardConfig from "../components/MileStoneRewardConfig";
import CompleteConfig from "../components/CompleteConfig";
import BeneficiaryConfig from "../components/BeneficiaryConfig";

function MyProjectPage() {
  const [currStep, setCurrStep] = useState(1); // start from 1
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

  const handleComplete = () => {
    let milestoneTitleArray = [];
    let rewardArray = [];
    let totalReward = 0;
    milestoneRewardArray.forEach((item) => {
      milestoneTitleArray.push(item.title);
      rewardArray.push(item.reward);
      totalReward = totalReward + parseFloat(item.reward);
    });
    console.log(
      duration,
      beneficiary,
      repoUrl,
      milestoneTitleArray,
      rewardArray,
      totalReward
    );
    alert(
      JSON.stringify({
        expiration: duration,
        beneficiary: beneficiary,
        url: repoUrl,
        milestones: milestoneTitleArray,
        rewards: rewardArray,
        totalRewards: totalReward,
      })
    );
  };

  const handleSetMilestoneRewardArrayCallback = (res) => {
    console.log(res);
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
