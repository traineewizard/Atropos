import React, { useEffect } from "react";
import { constFlag } from "../utils/constFlag";

function MainPage({ jumpPageCallback }) {
  const handleStartProjectClick = () => {
    jumpPageCallback(constFlag.pageMyProject);
  };

  useEffect(() => {}, []);
  return (
    <div className="divide-y divide-divide-gray">
      <div className="flex justify-between items-center mb-10">
        <div className="flex justify-start">
          <div className="pr-5 font-medium text-xl">All Projects</div>
          <div className="pr-5 font-medium text-xl">In Progress</div>
          <div className="pr-5 font-medium text-xl">Done</div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white w-40
       py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleStartProjectClick}
        >
          Start a Project
        </button>
      </div>
      <div className="flex justify-center items-center h-96 text-title-gray">
        No Available Project
      </div>
    </div>
  );
}

export default MainPage;
