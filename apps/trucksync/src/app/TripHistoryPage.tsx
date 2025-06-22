import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiFilter,
  FiCalendar,
  FiList,
  FiUser,
} from "react-icons/fi";

const trips = [
  {
    id: "1",
    from: "Chennai",
    to: "Coimbatore",
    date: "2025-06-20",
    cost: 5000,
    status: "Completed",
    ownerName: "John Doe",
  },
  {
    id: "2",
    from: "Bangalore",
    to: "Mysore",
    date: "2025-06-18",
    cost: 3000,
    status: "In Transit",
    ownerName: "Sarah Lee",
  },
  {
    id: "3",
    from: "Madurai",
    to: "Trichy",
    date: "2025-06-15",
    cost: 2500,
    status: "Completed",
    ownerName: "John Doe",
  },
];

interface TripHistoryPageProps {
  role: "owner" | "admin"; // Owner or Admin
}

const TripHistoryPage: React.FC<TripHistoryPageProps> = ({ role }) => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const filteredTrips = trips.filter((trip) => {
    const statusCheck = statusFilter === "All" || trip.status === statusFilter;
    const dateCheck = !dateFilter || trip.date === dateFilter;
    return statusCheck && dateCheck;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-4 space-x-2">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <FiArrowLeft className="text-2xl" />
        </button>
        <h1 className="text-xl font-bold">Trip History</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-around p-4 space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2">
          <FiList className="text-gray-600" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded border-gray-300 p-2 focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Transit">In Transit</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <FiCalendar className="text-gray-600" />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded border-gray-300 p-2 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Trip List */}
      <div className="p-4 space-y-4">
        {filteredTrips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => navigate(`/trip/${trip.id}`, { state: { role } })}
            className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold text-gray-800">
                  {trip.from} → {trip.to}
                </div>
                <div className="text-gray-500 text-sm">{trip.date}</div>
              </div>
              <span
                className={`text-sm rounded-full px-3 py-1 font-semibold 
                  ${trip.status === "Completed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}
              >
                {trip.status}
              </span>
            </div>
            <div className="text-gray-700 font-medium mt-2">Cost: Rs. {trip.cost}</div>
            {role === "admin" && (
              <div className="text-gray-600 text-sm flex items-center space-x-1 mt-1">
                <FiUser />
                <span>Owner: {trip.ownerName}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHistoryPage;
