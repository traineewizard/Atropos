import React from "react";
import MilestoneRewardItemView from "./MilestoneRewards/MilestoneRewardItemView";

function CompleteConfig({
  step,
  projectTile,
  duration,
  beneficiary,
  milestoneRewardArray,
  backCallback,
  compelteCallback,
}) {
  return (
    <>
      {step === 5 && (
        <div>
          <div className="block font-bold  text-xl mb-2" htmlFor="url">
            Project Title:
          </div>
          <div className="mb-5">{projectTile}</div>
          <div className="font-bold">Duration</div>
          <div className="mb-10">{duration}</div>
          {milestoneRewardArray.length > 0 &&
            milestoneRewardArray.map((milestone, index) => (
              <MilestoneRewardItemView
                key={index}
                milestone={milestone}
              ></MilestoneRewardItemView>
            ))}

          <div className="font-bold">Beneficiary</div>
          <div>{beneficiary}</div>
          <div className="flex items-center justify-end mt-10  mb-10">
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
              onClick={compelteCallback}
            >
              Complete
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CompleteConfig;
