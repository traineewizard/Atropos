import React, { useEffect, useState } from "react";

import GithubRepoConfig from "../components/GithubRepoConfig";
import GithubRepoInfo from "../components/GithubRepoInfo";
import SequenceLeftTitle from "../components/SequenceTitleLeft";
import MileStoneRewardConfig from "../components/MileStoneRewardConfig";
import CompleteConfig from "../components/CompleteConfig";
import BeneficiaryConfig from "../components/BeneficiaryConfig";

function MyProjectPage() {
  const [currStep, setCurrStep] = useState(2); // start from 1
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

  const handleSetBneneficiary = (res) => {
    setBeneficiary(res);
  };

  const handleComplete = () => {
    alert("complete click");
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
              nextCallback={handleNextClick}
            ></GithubRepoConfig>
            <GithubRepoInfo
              step={currStep}
              backCallback={handleBackClick}
              nextCallback={handleNextClick}
              milestoneReardCallback={handleSetMilestoneRewardArrayCallback}
            ></GithubRepoInfo>
            <MileStoneRewardConfig
              step={currStep}
              backCallback={handleBackClick}
              nextCallback={handleNextClick}
              milestoneRewardArray={milestoneRewardArray}
              milestoneReardCallback={handleSetMilestoneRewardArrayCallback}
            ></MileStoneRewardConfig>
            <BeneficiaryConfig
              step={currStep}
              backCallback={handleBackClick}
              nextCallback={handleNextClick}
              configBeneficiaryCallback={handleSetBneneficiary}
            ></BeneficiaryConfig>
            <CompleteConfig
              step={currStep}
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
