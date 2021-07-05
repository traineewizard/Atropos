import React from "react";

function SequenceTitleLeft({ step }) {
  return (
    <div className=" grid grid-cols-1 mt-20 justify-items-end mr-20 h-96">
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
        Project Setup
      </div>
      <div
        className={
          step === 3 ? "pb-10 text-xl" : "pb-10 text-xl text-title-gray"
        }
      >
        Milestone Reward Setup
      </div>
      <div
        className={
          step === 4 ? "pb-10 text-xl" : "pb-10 text-xl text-title-gray"
        }
      >
        Beneficiary Setup
      </div>
      <div
        className={
          step === 5 ? "pb-10 text-xl" : "pb-10 text-xl text-title-gray"
        }
      >
        Complete
      </div>
    </div>
  );
}

export default SequenceTitleLeft;
