import React from "react";

function MilestoneRewardItemView({ title, issue, description, reward }) {
  return (
    <>
      <div className="flex mb-5 justify-between">
        <div className="block text-md font-bold" htmlFor="url">
          {title}
        </div>
        <div className="text-title-blue font-bold">{issue} Issues</div>
      </div>

      <div className="col-span-2 text-title-gray">{description}</div>

      <div className="grid grid-cols-2 mt-2 mb-10">
        <div className="grid grid-cols-2 items-center pr-5">
          <div className="">Milestone Reward:</div>
          <div>{reward}</div>
        </div>
      </div>
    </>
  );
}

export default MilestoneRewardItemView;
