import React from "react";

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Finshop Dashboard</h1>
      <div className="flex items-center gap-4">
        <span>{user?.name}</span>
        <button
          onClick={onLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
