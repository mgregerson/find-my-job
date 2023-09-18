"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

export const RegisterForm = () => {
  let [loading, setLoading] = useState(false);
  let [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setLoading(false);
      if (!res.ok) {
        alert((await res.json()).message);
        return;
      }

      signIn(undefined, { callbackUrl: "/job-board" });
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
          type="email"
          placeholder="Email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          style={{ padding: "1rem", border: "1px solid #ccc" }}
        />
        <label htmlFor="password"></label>
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
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
