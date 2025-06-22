import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiUser, FiCalendar, FiList } from "react-icons/fi";

const trips = [
  {
    id: "1",
    from: "Chennai",
    to: "Coimbatore",
    date: "2025-06-20",
    cost: 5000,
    status: "Completed",
    ownerName: "John Doe",
    goods: "Weight",
    distance: "510 km",
  },
  {
    id: "2",
    from: "Bangalore",
    to: "Mysore",
    date: "2025-06-18",
    cost: 3000,
    status: "In Transit",
    ownerName: "Sarah Lee",
    goods: "Volume",
    distance: "150 km",
  },
  {
    id: "3",
    from: "Madurai",
    to: "Trichy",
    date: "2025-06-15",
    cost: 2500,
    status: "Completed",
    ownerName: "John Doe",
    goods: "Refrigerated",
    distance: "130 km",
  },
];

const TripDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const role = location.state?.role as "owner" | "admin";

  const trip = trips.find((t) => t.id === id);
  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        Trip not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-4 space-x-2">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <FiArrowLeft className="text-2xl" />
        </button>
        <h1 className="text-xl font-bold">Trip Details</h1>
      </div>

      {/* Details Card */}
      <div className="bg-white rounded-lg p-4 m-4 space-y-3 shadow">
        <div className="font-bold text-gray-800">
          Route: {trip.from} → {trip.to}
        </div>
        <div className="text-gray-600 flex items-center space-x-1">
          <FiCalendar />
          <span>{trip.date}</span>
        </div>
        <div className="text-gray-600 flex items-center space-x-1">
          <FiList />
          <span>Cost: Rs. {trip.cost}</span>
        </div>
        <div className="text-gray-600 flex items-center space-x-1">
          <FiList />
          <span>Distance: {trip.distance}</span>
        </div>
        <div className="text-gray-600 flex items-center space-x-1">
          <FiList />
          <span>Goods Type: {trip.goods}</span>
        </div>
        {role === "admin" && (
          <div className="text-gray-600 flex items-center space-x-1">
            <FiUser />
            <span>Owner: {trip.ownerName}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetailsPage;
