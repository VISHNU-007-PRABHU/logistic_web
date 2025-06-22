import React, { useState } from "react";
import { FiMenu, FiX, FiUser, FiList, FiHome } from "react-icons/fi";
import { Link, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import TripHistoryPage from "./pages/TripHistoryPage";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home", icon: <FiHome /> },
    { to: "/profile", label: "Profile", icon: <FiUser /> },
    { to: "/trip-history", label: "Trips", icon: <FiList /> },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-bold">My App</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 p-2 rounded hover:bg-gray-100"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* MAIN CONTENT + ROUTES */}
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/trip-history" element={<TripHistoryPage role="owner" />} />
        </Routes>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-2xl transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col p-4 space-y-4 z-50`}
      >
        <h3 className="text-lg font-bold border-b pb-2">Menu</h3>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 p-2 rounded hover:bg-gray-100"
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
        />
      )}
    </div>
  );
};

export default App;
