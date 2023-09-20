"use client";

import React, { useState, useEffect } from "react";
import JobColumn from "../../components/core/JobColumn";
import { useSession } from "next-auth/react";
import { getApplicationsByUser } from "@/lib/utils";

type ApplicationsArray = {
  Wishlist: Applications[];
  Applied: Applications[];
  Interview: Applications[];
  Offer: Applications[];
  Rejected: Applications[];
};

type Applications = {
  companyId: number;
  createdAt: string;
  id: number;
  jobTitle: string;
  notes: string;
  status: string;
  updatedAt: string;
  userId: number;
  company: any;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  return `${month}/${day}/${year}`;
}

async function getApplications(id: number) {
  try {
    const applications = await getApplicationsByUser(id);
    return applications; // Return the resolved value
  } catch (error) {
    // Handle errors if needed
    console.error("Error fetching applications:", error);
    throw error; // Rethrow the error to handle it in the caller if needed
  }
}

function JobBoard() {
  const [applications, setApplications] = useState<ApplicationsArray | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const addJob = () => {
    return "HI!";
  };

  const { data: session, status } = useSession();

  console.log("DUH SESSHHH", session);

  useEffect(() => {
    if (loading) {
      getApplications(session?.user?.id)
        .then((result) => {
          setApplications(result);
          setLoading(false);
        })
        .catch((error) => {
          // Handle errors if needed
          console.error("Error in getApplications:", error);
        });
    }
  }, []);

  console.log(applications, "THE APPLICATIONS ARE HERE");

  return (
    <div style={{ width: "100%", overflowX: "scroll" }}>
      <div style={{ display: "flex", minWidth: "300px" }}>
        {applications &&
          Object.entries(applications).map(([status, apps]) => (
            <div key={status} style={{ minWidth: "300px" }}>
              <JobColumn
                title={apps[0]?.status || "Unknown"}
                icon="wishlist"
                addJob={addJob}
                jobs={apps.map((app) => ({
                  logo: "testlogo",
                  job: app.jobTitle,
                  company: app.company.name,
                  applyDate: formatDate(app.createdAt),
                }))}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default JobBoard;
