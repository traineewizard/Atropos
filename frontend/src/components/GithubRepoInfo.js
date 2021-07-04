import React from "react";

function GithubRepoInfo({ step, backCallback, nextCallback }) {
  return (
    <>
      {step === 2 && (
        <div>
          <label class="block  text-md mb-4" for="url">
            Project Title:
          </label>
          <input
            class="shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Project title"
          ></input>
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

export default GithubRepoInfo;
