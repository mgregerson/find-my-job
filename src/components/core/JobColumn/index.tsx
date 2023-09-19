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
  return (
    <div
      className="border-gray-200 border-2 text-center"
      style={{ flex: "1 0 275px" }}
    >
      <div className="mt-10 font-bold">{title}</div>
      <div className="text-gray-400">{jobs.length} Jobs</div>
      <AddJobButton symbol={"+"} />
      {jobs.map((job, index) => {
        return (
          <JobCard
            key={index}
            job={job.job}
            logo={"testlogo"}
            company={job.company}
            applyDate={job.applyDate}
          />
        );
      })}
    </div>
  );
};

export default JobColumn;
