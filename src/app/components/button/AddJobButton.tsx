"use client";

import React from "react";
import { AddJobButtonProps } from "./constants";
import axios from "axios"; // Import Axios for making HTTP requests

const AddJobButton = ({ symbol, onClick }: AddJobButtonProps) => {
  const handleButtonClick = async () => {
    try {
      const postData = {
        companyId: 1,
        notes: "Cool Company",
        jobTitle: "Software Engineer",
        status: "APPLIED",
      };

      // Make a POST request to the "api/apply" endpoint with the data
      const response = await axios.post("/api/apply", postData);

      // Handle the response as needed
      console.log("POST request successful:", response.data);
    } catch (error) {
      // Handle errors if the POST request fails
      console.error("Error making POST request:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        className="bg-gray-200 hover:bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded-md w-2/3"
        onClick={handleButtonClick} // Attach the click event handler
      >
        {symbol}
      </button>
    </div>
  );
};

export default AddJobButton;
