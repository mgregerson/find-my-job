"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCompanies } from "../lib/utils";
import AddJobButton from "../components/button/AddJobButton";

const Profile = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["Companies"],
    queryFn: getCompanies,
  });

  console.log("THE DATA=", data, "THE LOADING=", isLoading);

  return <div>Profile Page</div>;
};

export default Profile;
