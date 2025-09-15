import React, { useState } from "react";
import { signup } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Signup({ onAuth }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    tenantName: "",
    tenantSlug: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await signup(form);
      localStorage.setItem("token", token);
      if (onAuth) onAuth(token);
      navigate("/dashboard"); // Redirect after signup
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">Signup</h2>
      {["name", "email", "password", "tenantName", "tenantSlug"].map((field) => (
        <input
          key={field}
          type={field === "password" ? "password" : "text"}
          name={field}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />
      ))}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-4"
      >
        Signup
      </button>
      <div className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
