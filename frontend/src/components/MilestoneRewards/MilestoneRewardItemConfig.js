import React, { useEffect } from "react";

function MilestoneRewardItemConfig({ index, milestoneReward }) {
  useEffect(() => {
    console.log(index, milestoneReward);
  }, []);
  return (
    <>
      <div className="flex mb-4 justify-between">
        <div className="block text-md font-bold" htmlFor="url">
          Milestone #{index} - {milestoneReward.title}
        </div>
        <div className="text-title-blue font-bold">0 Issues</div>
      </div>

      <div className="col-span-2 text-title-gray">Test milestone</div>

      <div className="grid grid-cols-2 mt-2 mb-10">
        <div className="grid grid-cols-2 items-center pr-5">
          <div className="">Milestone Reward:</div>
          <input
            className="shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reward"
            type="text"
            placeholder="100"
          ></input>
        </div>
      </div>
    </>
  );
}

export default MilestoneRewardItemConfig;
