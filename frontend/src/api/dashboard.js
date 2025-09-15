// frontend/src/api/dashboard.js
import axios from "axios";

export const getDashboard = async () => {
  const token = localStorage.getItem("token"); // JWT stored after login
  if (!token) return null;

  try {
    const res = await axios.get("http://localhost:5002/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.user; // user info returned from backend
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    return null;
  }
};
