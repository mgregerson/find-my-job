import React from "react";
import JobColumn from "../components/core/JobColumn";

const Jobs = () => {
  const addJob = () => {
    return "HI!";
  };

  return (
    <div style={{ width: "100%", overflowX: "scroll" }}>
      <div style={{ display: "flex" }}>
        <JobColumn
          title="Wishlist"
          icon="wishlist"
          addJob={addJob}
          jobs={[
            {
              logo: "testlogo",
              job: "testjob",
              company: "testcompany",
              applyDate: "12/9/2022",
            },
            {
              logo: "testlogo2",
              job: "testjob2",
              company: "testcompany2",
              applyDate: "12/9/2023",
            },
          ]}
        />
        <JobColumn
          title="Applied"
          icon="wishlist"
          addJob={addJob}
          jobs={["test", "jobs"]}
        />
        <JobColumn
          title="Interview"
          icon="wishlist"
          addJob={addJob}
          jobs={["test", "jobs"]}
        />
        <JobColumn
          title="Offer"
          icon="wishlist"
          addJob={addJob}
          jobs={["test", "jobs"]}
        />
        <JobColumn
          title="Rejected"
          icon="wishlist"
          addJob={addJob}
          jobs={["test", "jobs"]}
        />
      </div>
    </div>
  );
};

export default Jobs;
