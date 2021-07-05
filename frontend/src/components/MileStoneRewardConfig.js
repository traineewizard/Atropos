import React, { useEffect, useState } from "react";
import MilestoneRewardItemConfig from "./MilestoneRewards/MilestoneRewardItemConfig";

function MileStoneRewardConfig({
  step,
  backCallback,
  nextCallback,
  milestoneRewardArray,
  milestoneRewardCallback,
}) {
  const [milestoneRewardArrayConfiged, setMilestoneRewardArrayConfig] =
    useState(milestoneRewardArray);

  const handleMilestoneRewardArrayChange = (index, milestoneReward) => {
    setMilestoneRewardArrayConfig(() => {
      let _milestoneRewardArrayConfiged = milestoneRewardArrayConfiged;
      _milestoneRewardArrayConfiged[index] = milestoneReward;
      return _milestoneRewardArrayConfiged;
    });
  };

  const handleNextClick = () => {
    milestoneRewardCallback(milestoneRewardArrayConfiged);
    nextCallback();
  };

  useEffect(() => {
    console.log(milestoneRewardArray[0]);
  });
  return (
    <>
      {step === 3 && (
        <div>
          {milestoneRewardArray.length > 0 &&
            milestoneRewardArray.map((milestoneReward, i) => (
              <MilestoneRewardItemConfig
                key={i}
                index={i + 1}
                milestoneReward={milestoneReward}
                milestoneRewardCallback={handleMilestoneRewardArrayChange}
              ></MilestoneRewardItemConfig>
            ))}

          <div className="flex items-center justify-end mt-10">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white  w-32 py-2 px-4 mr-5 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={backCallback}
            >
              Back
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white  w-32 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MileStoneRewardConfig;
