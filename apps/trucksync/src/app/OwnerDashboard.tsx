import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiDollarSign,
} from "react-icons/fi";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const OwnerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const data = [
    { date: "2025-06-15", earnings: 2500 },
    { date: "2025-06-18", earnings: 3000 },
    { date: "2025-06-20", earnings: 5000 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex items-center p-4 space-x-2">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <FiArrowLeft className="text-2xl" />
        </button>
        <h1 className="text-xl font-bold">Owner Dashboard</h1>
      </div>

      <div className="bg-white rounded-lg p-4 m-4 space-y-3 shadow">
        <div className="flex items-center space-x-2">
          <FiDollarSign className="text-gray-600" />
          <h2 className="text-lg font-bold">Earnings Over Time</h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
