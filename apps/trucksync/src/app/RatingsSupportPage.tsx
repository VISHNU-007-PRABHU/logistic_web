import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";

const RatingsSupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);

  return (
    <div className="min-h-screen flex flex-col p-4 bg-gray-50">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <FiArrowLeft className="text-2xl" />
        </button>
        <h1 className="text-xl font-bold">Ratings & Support</h1>
      </div>

      {/* Rate your trip */}
      <div className="bg-white rounded-lg p-4 mt-4 space-y-2">
        <span className="text-gray-700 font-semibold">Rate your trip</span>
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => {
            const starIndex = index + 1;
            return (
              <span
                key={index}
                className={`text-3xl cursor-pointer transition 
                  ${rating >= starIndex ? "text-yellow-500" : "text-gray-300"}`}
                onClick={() => setRating(starIndex)}
              >
                ★
              </span>
            );
          })}
        </div>
      </div>

      {/* Raise Issue Button */}
      <div
        className="bg-white rounded-lg p-4 mt-4 flex justify-between items-center cursor-pointer hover:shadow"
        onClick={() => navigate("/raise-issue")}
      >
        <span className="text-gray-800 font-medium">Raise Issue</span>
        <FiChevronRight className="text-gray-500 text-2xl" />
      </div>

      {/* FAQ / Contact Us Button */}
      <div
        className="bg-white rounded-lg p-4 mt-4 flex justify-between items-center cursor-pointer hover:shadow"
        onClick={() => navigate("/faq-contact")}
      >
        <span className="text-gray-800 font-medium">FAQ / Contact Us</span>
        <FiChevronRight className="text-gray-500 text-2xl" />
      </div>
    </div>
  );
};

export default RatingsSupportPage;
