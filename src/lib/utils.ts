import axios from "axios";

export const getCompanies = async () => {
  let result: any = await axios.get("http://localhost:3000/api/companies");
  return result.data;
};

export const getApplicationsByUser = async (userId: number) => {
  let result: any = await axios.get(
    `http://localhost:3000/api/applications/${userId}`
  );
  return result.data;
};

async function getJobData(id: number) {
  const res = await fetch(`https://api.applications/${id}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
