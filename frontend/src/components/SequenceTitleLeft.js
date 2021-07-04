import React from "react";

function SequenceTitleLeft({ step }) {
  return (
    <div className=" grid grid-cols-1 mt-20 justify-items-end mr-20">
      <div
        className={
          step === 1 ? "pb-10 text-xl" : "pb-10 text-xl text-title-gray"
        }
      >
        Github Repository
      </div>
      <div
        className={
          step === 2 ? "pb-10 text-xl" : "pb-10 text-xl text-title-gray"
        }
      >
        Project Description
      </div>
      <div
        className={
          step === 3 ? "pb-10 text-xl" : "pb-10 text-xl text-title-gray"
        }
      >
        Milestone Setup
      </div>
      <div
        className={
          step === 4 ? "pb-10 text-xl" : "pb-10 text-xl text-title-gray"
        }
      >
        Complete
      </div>
    </div>
  );
}

export default SequenceTitleLeft;
