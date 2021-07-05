import React, { useEffect, useState } from "react";

function GithubRepoInfo({
  step,
  milestoneReardCallback,
  backCallback,
  nextCallback,
}) {
  const [projectTitle, setProjectTitle] = useState("");
  const [duration, setDuration] = useState("");

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  useEffect(() => {
    setProjectTitle("EthSign-3.0-API"); // TODO, parse project title from github RESTful api
    let awaitMiltstoneArray = [
      { title: "Test", issue: 0, reward: 0 },
      { title: "Test2", issue: 0, reward: 0 },
      { title: "Test3", issue: 0, reward: 0 },
    ]; // TODO, parse milestones from github RESTful api
    milestoneReardCallback(awaitMiltstoneArray);
  }, []);

  return (
    <>
      {step === 2 && (
        <div>
          <label className="block text-xl mb-4 font-bold" htmlFor="url">
            Project Title:
          </label>
          <div className="mb-5">{projectTitle}</div>

          <label className="block text-xl mb-4 font-bold" htmlFor="url">
            Duration Config:
          </label>
          <input
            className="shadow appearance-none border rounded w-full h-12 py-2 px-3 mb-5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="date"
            type="text"
            value={duration}
            placeholder="Project duration config"
            onChange={handleDurationChange}
          ></input>
          <div className="flex items-center justify-end mt-10">
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
