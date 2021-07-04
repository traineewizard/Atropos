import React from "react";

function MileStoneRewardConfig({ step, backCallback, nextCallback }) {
  return (
    <>
      {step === 3 && (
        <div>
          <div className="flex mb-4 justify-between">
            <div class="block text-md font-bold" for="url">
              Milestone #1 Milestone Sample Name
            </div>
            <div className="text-title-blue font-bold">7 Issues</div>
          </div>

          <div className="col-span-2 text-title-gray">
            This is a paragraph of Milestone descripton pulled from Github Repo.
          </div>

          <div className="grid grid-cols-2 mt-5">
            <div className="grid grid-cols-2 items-center pr-5">
              <div className="">Milestone Reward:</div>
              <input
                class="shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Project title"
              ></input>
            </div>

            <div className="grid grid-cols-2 items-center pr-5">
              <div className="">Delivery Date:</div>
              <input
                class="shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Project title"
              ></input>
            </div>
          </div>

          <div class="flex items-center justify-end mt-10">
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
              onClick={nextCallback}
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
