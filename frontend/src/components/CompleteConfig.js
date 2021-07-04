import React from "react";

function CompleteConfig({ step, backCallback, nextCallback }) {
  return (
    <>
      {step === 4 && (
        <div>
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

export default CompleteConfig;
