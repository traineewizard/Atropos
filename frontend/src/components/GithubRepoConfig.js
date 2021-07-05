import React, { useState } from "react";

function GithubRepoConfig({ step, repoUrlCallback, nextCallback }) {
  const [githubRepoUrl, setGithubRepoUrl] = useState("");

  const handleGithubRepoChange = (event) => {
    console.log(event.target.value);
    setGithubRepoUrl(event.target.value);
  };

  const handleNextClick = () => {
    repoUrlCallback(githubRepoUrl);
    nextCallback();
  };

  return (
    <>
      {step === 1 && (
        <div>
          <label className="block  text-md mb-4" htmlFor="url">
            Github Repo URL:
          </label>
          <input
            className="shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="url"
            type="text"
            value={githubRepoUrl}
            onChange={handleGithubRepoChange}
            placeholder="https://github.com/sampleRepoName"
          ></input>
          <div className="flex items-center justify-end mt-10">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white  w-32 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleNextClick}
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
