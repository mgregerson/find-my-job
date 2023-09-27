"use client";

import React from "react";
import { AddJobButtonProps } from "./constants";
import axios from "axios"; // Import Axios for making HTTP requests
import { useRouter } from "next/navigation";

const AddJobButton = ({ onClick }: AddJobButtonProps) => {
  const router = useRouter();

  const handleClick = async () => {
    router.push("/add-job");
  };

  return (
    <div className="flex justify-center">
      <button
        className="bg-gray-200 hover:bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded-md w-2/3"
        onClick={handleClick}
      >
        +
      </button>
    </div>
  );
};

export default AddJobButton;
