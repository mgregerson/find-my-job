import React from "react";
import Link from "next/link";

interface JobCardProps {
  logo: string;
  job: string;
  company: string;
  applyDate?: string;
  applicationId: number;
}

const JobCard = ({
  logo,
  job,
  company,
  applyDate,
  applicationId,
}: JobCardProps) => {
  return (
    <Link href={`/applications/${applicationId}`}>
      <div className="flex border pl-2 m-2 p-1 rounded-md text-xs min-h-[100px] hover:bg-slate-400 bg-slate-200">
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
          ></div>
          <div
            style={{
              flex: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              paddingRight: "0.25rem",
              whiteSpace: "nowrap",
            }}
          >
            {applyDate && <h3>{applyDate}</h3>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
