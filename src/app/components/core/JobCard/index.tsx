import React from "react";

interface JobCardProps {
  logo: string;
  job: string;
  company: string;
  applyDate?: string;
}

const JobCard = ({ logo, job, company, applyDate }: JobCardProps) => {
  return (
    <div className="flex border p-4 m-2 p-1 rounded-md text-xs min-h-[100px]">
      <div style={{ flex: "1" }} className="text-left pt-2">
        {logo}
      </div>
      <div style={{ flex: "2", paddingTop: "0.5rem" }}>
        <div className="flex flex-col">
          <h2 className="text-left">{job}</h2>
          <h3 className="text-left">{company}</h3>
        </div>
      </div>
      <div style={{ flex: "1" }} className="text-right flex">
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
          }}
        >
          Test
        </div>
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: "0.5rem",
            paddingRight: "0.25 rem",
          }}
        >
          {applyDate && <h3>{applyDate}</h3>}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
