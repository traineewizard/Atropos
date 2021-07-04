import React from "react";

function GithubRepoConfig({ step, nextCallback }) {
  return (
    <>
      {step === 1 && (
        <div>
          <label class="block  text-md mb-4" for="url">
            Github Repo URL:
          </label>
          <input
            class="shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="url"
            type="text"
            placeholder="https://github.com/sampleRepoName"
          ></input>
          <div class="flex items-center justify-end mt-10">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white  w-32 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default GithubRepoConfig;
