import React from "react";
import MilestoneRewardItemView from "./MilestoneRewards/MilestoneRewardItemView";

function CompleteConfig({ step, backCallback, compelteCallback, beneficiary }) {
  return (
    <>
      {step === 5 && (
        <div>
          <div className="block font-bold  text-xl mb-4" htmlFor="url">
            Project Title:
          </div>
          <MilestoneRewardItemView
            title="Milestone #1 Test"
            description="Test milestone"
            reward={100}
            issue={0}
          ></MilestoneRewardItemView>
          <MilestoneRewardItemView
            title="Milestone #2 Test"
            description="This is a paragraph of Milestone descripton pulled from Github Repo."
            reward={110}
            issue={0}
          ></MilestoneRewardItemView>
          <MilestoneRewardItemView
            title="Milestone #3 Milestone Sample Name"
            description="This is a paragraph of Milestone descripton pulled from Github Repo."
            reward={120}
            issue={0}
          ></MilestoneRewardItemView>
          <div>Beneficiary</div>
          <div>{beneficiary}</div>
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
