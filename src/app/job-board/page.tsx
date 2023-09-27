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
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  const timeDifference = (currentDate as any) - (inputDate as any);

  if (timeDifference < 0) {
    return "Invalid date"; // Handle invalid input dates
  }

  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const monthsDifference = Math.floor(daysDifference / 30);

  if (monthsDifference < 1) {
    return `${daysDifference} days`;
  } else {
    return `${monthsDifference} mo`;
  }
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
  }, [loading, session?.user?.id]);

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
                  applicationId: app.id,
                }))}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default JobBoard;
