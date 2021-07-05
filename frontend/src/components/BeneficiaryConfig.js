import React, { useState } from "react";

function BeneficiaryConfig({
  step,
  configBeneficiaryCallback,
  backCallback,
  nextCallback,
}) {
  const [beneficiary, setBeneficiary] = useState("");
  const handleBeneficiaryChange = (event) => {
    setBeneficiary(event.target.value);
  };
  const handleNextClick = () => {
    configBeneficiaryCallback(beneficiary);
    nextCallback();
  };
  return (
    <>
      {step === 4 && (
        <div>
          <label className="block  text-md mb-4" htmlFor="url">
            Beneficiary Address:
          </label>
          <input
            className="shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            value={beneficiary}
            onChange={handleBeneficiaryChange}
            placeholder="0xab12ded..."
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

export default BeneficiaryConfig;
