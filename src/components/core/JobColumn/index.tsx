import React from "react";
import AddJobButton from "../../button/AddJobButton";
import JobCard from "../JobCard";

export interface JobColumnProps {
  title: string;
  icon: string;
  addJob: () => void;
  jobs: any[];
}

const JobColumn = ({ title, icon, addJob, jobs }: JobColumnProps) => {
  console.log("JOBS=", jobs);
  return (
    <div
      className="border-gray-200 border-2 text-center mr-2"
      style={{
        flex: "1 0 275px",
        display: "flex",
        flexDirection: "column",
        height: "100%", // Make each column stretch to the bottom
      }}
    >
      <div className="mt-10 font-bold">{title}</div>
      <div className="text-gray-400">{jobs.length} Jobs</div>
      <AddJobButton />
      <div className="p-2" style={{ flex: 1, overflowY: "auto" }}>
        {jobs.map((job, index) => {
          return (
            <JobCard
              key={index}
              job={job.job}
              logo={"testlogo"}
              company={job.company}
              applyDate={job.applyDate}
              applicationId={job.applicationId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default JobColumn;
