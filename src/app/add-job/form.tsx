"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export const AddJobForm = () => {
  let [loading, setLoading] = useState(false);
  let [formValues, setFormValues] = useState({
    jobTitle: "",
    companyId: "",
    status: "",
    notes: "",
  });
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);

      if (res.ok) {
        // If the response is ok, navigate to the root of your app
        router.push("/");
      }
    } catch (error: any) {
      setLoading(false);
      console.error(error);
      alert(error.message);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: 10,
          width: "40%",
        }}
      >
        <label htmlFor="email"></label>
        <input
          required
          type="text"
          placeholder="Job Title"
          name="jobTitle"
          value={formValues.jobTitle}
          onChange={handleChange}
          style={{ padding: "1rem", border: "1px solid #ccc" }}
        />
        <label htmlFor="password"></label>
        <input
          required
          type="text"
          name="companyId"
          placeholder="Company ID"
          value={formValues.companyId}
          onChange={handleChange}
          style={{ padding: "1rem", border: "1px solid #ccc" }}
        />
        <input
          required
          type="textarea"
          name="notes"
          placeholder="Notes"
          value={formValues.notes}
          onChange={handleChange}
          style={{ padding: "1rem", border: "1px solid #ccc" }}
        />
        <button
          style={{
            backgroundColor: `${loading ? "#ccc" : "#3446eb"}`,
            color: "#fff",
            padding: "1rem",
            cursor: "pointer",
            borderRadius: "0.5rem",
          }}
          disabled={loading}
        >
          {loading ? "loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};
