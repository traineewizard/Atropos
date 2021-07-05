import React from "react";

function MilestoneDetail({ milestone, duration, index }) {
  return (
    <form className="bg-white shadow-md rounded mx-3 px-8 pt-6 pb-8 mb-4">
      <div className="flex justify-between">
        <div className="font-bold">Milestone #{index}</div>
        <div className="text-title-blue font-bold">Due Date: {duration}</div>
      </div>

      <div>{milestone && milestone.descriptiion}</div>
      <div className="bg-bar-orange h-2 rounded mt-5"></div>
    </form>
  );
}

export default MilestoneDetail;
