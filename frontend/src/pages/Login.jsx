import React, { useState } from "react";
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ onAuth }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(form);
      localStorage.setItem("token", token);
      if (onAuth) onAuth(token);
      navigate("/dashboard"); // Redirect after login
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 mb-4"
      >
        Login
      </button>
      <div className="text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Signup
        </Link>
      </div>
    </div>
  );
}
