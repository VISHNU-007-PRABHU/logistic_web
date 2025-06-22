import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("Customer");

  const handleSignUp = () => {
    // Perform sign up action
    console.log("Signing up as:", accountType);
    navigate("/home"); // Redirect after sign up
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-lg p-4 sm:p-6 space-y-4 shadow">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <button onClick={() => navigate(-1)} className="text-gray-600">
            ←
          </button>
          <h1 className="text-xl font-bold">Sign Up</h1>
        </div>

        {/* Account Type Selection */}
        <div className="space-y-2">
          {["Customer", "Truck Owner", "Logistics Company"].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                value={type}
                checked={accountType === type}
                onChange={(e) => setAccountType(e.target.value)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>

        {/* Form Fields */}
        <div className="space-y-3">
          <input
            className="w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Name"
            type="text"
          />
          
          <div className="flex space-x-2">
            <input
              className="flex-1 rounded border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              placeholder="Phone Number"
              type="tel"
            />
            <button className="text-blue-600 font-semibold">OTP</button>
          </div>

          <input
            className="w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Email (optional)"
            type="email"
          />

          <div className="flex justify-between items-center rounded border p-2">
            <span>ID Upload</span>
            <button className="text-blue-600 font-semibold">Upload</button>
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          className="bg-blue-600 text-white rounded-lg py-3 w-full font-semibold hover:bg-blue-700 transition"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
