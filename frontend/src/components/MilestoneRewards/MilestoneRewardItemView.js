import React from "react";

function MilestoneRewardItemView({ milestone }) {
  return (
    <>
      <div className="flex mb-5 justify-between">
        <div className="block text-md font-bold" htmlFor="url">
          {milestone.title}
        </div>
        <div className="text-title-blue font-bold">
          {milestone.issue} Issues
        </div>
      </div>

      <div className="col-span-2 text-title-gray">{milestone.description}</div>

      <div className="grid grid-cols-2 mt-2 mb-10">
        <div className="grid grid-cols-2 items-center pr-5">
          <div className="">Milestone Reward:</div>
          <div>{milestone.reward}</div>
        </div>
      </div>
    </>
  );
}

export default MilestoneRewardItemView;
