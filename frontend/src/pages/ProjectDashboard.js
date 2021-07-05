import React, { useState } from "react";
import Milestoneitem from "../components/MileStoneItem";
import { useInterval } from "../utils/useInterval";
import { useWallet } from "use-wallet";
import Web3 from "web3";
import { contractAbi } from "../utils/contractAbi";

function ProjectDashboard({
  duration,
  provider,
  milestoneArray,
  contractAddress,
}) {
  const wallet = useWallet();
  const [milestoneArrayProgress, setMilestoneArrayProgress] = useState([]);
  const [milestoneArrayDone, setMilestoneArrayDone] = useState([]);
  useInterval(async () => {
    if ((provider, wallet.account, contractAddress)) {
      let web3 = new Web3(provider);
      let contractInstance = new web3.eth.Contract(
        contractAbi,
        contractAddress
      );

      await contractInstance.methods._milestonesIndex.call().then((res) => {
        console.log(res);
        let _milestoneArrayProgress = [];
        let _milestoneArrayDone = [];
        milestoneArray.forEach((item, index) => {
          if (index < parseInt(res)) {
            _milestoneArrayProgress.push(item);
          } else {
            _milestoneArrayDone.push(item);
          }
        });
        setMilestoneArrayProgress(milestoneArrayProgress);
        setMilestoneArrayDone(milestoneArrayDone);
      });
    }
  }, 1500);
  return (
    <>
      <div className="text-2xl font-bold">Astropos Hackmoney Project</div>
      <div className="text-xl text-title-blue font-bold py-4">
        Project Delivery Date: {duration}
      </div>
      <div className="grid grid-cols-3">
        <div>
          <div className="text-xl font-medium py-5">In Progress</div>
          {milestoneArrayProgress.map((milestone, index) => (
            <Milestoneitem
              milestone={milestone}
              duration={duration}
              index={index}
            ></Milestoneitem>
          ))}
        </div>
        <div>
          <div className="text-xl font-medium py-5">Done</div>
          {milestoneArrayDone.map((milestone, index) => (
            <Milestoneitem
              milestone={milestone}
              duration={duration}
              index={index}
            ></Milestoneitem>
          ))}
        </div>
        <div>
          <div className="text-xl font-medium py-5">Overdue</div>
        </div>
      </div>
    </>
  );
}

export default ProjectDashboard;
