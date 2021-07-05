import React from "react";

function ProjectPanel({ duration }) {
  return (
    <>
      <div className="text-2xl font-bold">Astropos Hackmoney Project</div>
      <div className="text-xl text-title-blue font-bold py-4">
        Project Delivery Date: {duration}
      </div>
      <div className="grid grid-cols-3">
        <div>
          <div className="text-xl font-medium py-5">In Progress</div>
        </div>
        <div>
          <div className="text-xl font-medium py-5">Done</div>
        </div>
        <div>
          <div className="text-xl font-medium py-5">Overdue</div>
        </div>
      </div>
    </>
  );
}

export default ProjectPanel;
