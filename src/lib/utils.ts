import axios from "axios";

export const getCompanies = async () => {
  let result: any = await axios.get("http://localhost:3000/api/companies");
  return result.data;
};
