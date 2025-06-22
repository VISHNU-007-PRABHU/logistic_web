import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiList, FiCreditCard, FiEdit } from "react-icons/fi";

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "John Doe",
    phone: "+91 98765 43210",
    email: "john.doe@example.com",
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({ ...user }); // Temporary state for edits

  const handleSave = () => {
    setUser({ ...tempUser });
    setIsEditing(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-4 space-x-2">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <FiArrowLeft className="text-2xl" />
        </button>
        <h1 className="text-xl font-bold">User Profile</h1>
      </div>

      {/* Avatar & Name */}
      <div className="flex flex-col items-center p-4">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-2 border-blue-600"
        />
        <h2 className="mt-3 text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-600">{user.phone}</p>
      </div>

      {/* User Details */}
      <div className="bg-white rounded-lg p-4 mx-4 mt-4 space-y-3">
        <div className="space-y-1">
          <label className="text-gray-700 font-medium">Name</label>
          <input
            type="text"
            disabled={!isEditing}
            value={tempUser.name}
            onChange={(e) => setTempUser({ ...tempUser, name: e.target.value })}
            className={`w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:outline-none ${isEditing ? "bg-gray-100" : "bg-gray-50"}`}
          />
        </div>

        <div className="space-y-1">
          <label className="text-gray-700 font-medium">Phone</label>
          <input
            type="text"
            disabled={!isEditing}
            value={tempUser.phone}
            onChange={(e) => setTempUser({ ...tempUser, phone: e.target.value })}
            className={`w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:outline-none ${isEditing ? "bg-gray-100" : "bg-gray-50"}`}
          />
        </div>

        <div className="space-y-1">
          <label className="text-gray-700 font-medium">Email</label>
          <input
            type="email"
            disabled={!isEditing}
            value={tempUser.email}
            onChange={(e) => setTempUser({ ...tempUser, email: e.target.value })}
            className={`w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:outline-none ${isEditing ? "bg-gray-100" : "bg-gray-50"}`}
          />
        </div>

        <div className="flex justify-end space-x-3 mt-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 flex items-center space-x-1"
            >
              <FiEdit /> <span>Edit</span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-green-700 flex items-center space-x-1"
            >
              ✅ Save
            </button>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="bg-white rounded-lg p-4 mx-4 mt-4 space-y-3">
        <button
          onClick={() => navigate("/trip-history")}
          className="w-full flex items-center space-x-3 p-3 rounded hover:bg-gray-100"
        >
          <FiList className="text-2xl text-gray-600" />
          <span className="text-gray-800 font-medium">Trip History</span>
        </button>

        <button
          onClick={() => navigate("/book")}
          className="w-full flex items-center space-x-3 p-3 rounded hover:bg-gray-100"
        >
          <FiCreditCard className="text-2xl text-gray-600" />
          <span className="text-gray-800 font-medium">Book</span>
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full flex items-center space-x-3 p-3 rounded hover:bg-gray-100"
        >
          <FiCreditCard className="text-2xl text-gray-600" />
          <span className="text-gray-800 font-medium">Dashboard</span>
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
