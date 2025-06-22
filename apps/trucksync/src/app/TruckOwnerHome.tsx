import React from "react";
import { FiArrowLeft, FiUser } from "react-icons/fi";
import { BsTruck, BsWallet2 } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";

const TruckOwnerHome: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 font-sans">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <FiArrowLeft className="text-2xl" />
        <h1 className="text-xl font-bold">Truck Owner Home</h1>
      </div>

      {/* Available Jobs */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Available Jobs</h2>
        <div className="bg-gray-100 rounded-lg p-3 flex justify-between items-center mt-2">
          <span>
            Pickup: Chennai
            <br />
            Drop: Coimbatore
          </span>
          <span className="text-gray-500">{">"}</span>
        </div>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center">
          <FaListAlt className="text-3xl text-blue-600" />
          <span className="mt-2 text-sm">My Bookings</span>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center">
          <BsWallet2 className="text-3xl text-blue-600" />
          <span className="mt-2 text-sm">Earnings</span>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center">
          <BsTruck className="text-3xl text-blue-600" />
          <span className="mt-2 text-sm">Meosto Management</span>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 flex flex-col items-center justify-center">
          <FiUser className="text-3xl text-blue-600" />
          <span className="mt-2 text-sm">Profile</span>
        </div>
      </div>
    </div>
  );
};

export default TruckOwnerHome;
