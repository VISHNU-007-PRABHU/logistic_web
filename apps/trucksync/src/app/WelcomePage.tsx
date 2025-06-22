import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // Replace with your actual route
  };
  
  const handleLanguageSelection = (lang: string) => {
    console.log(`Selected language: ${lang}`);
    // You can save the language to context, state, or local storage
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      {/* Logo */}
      <div className="bg-blue-600 rounded-xl p-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3443/3443331.png"
          alt="App Logo"
          className="h-16 w-16 sm:h-20 sm:w-20"
        />
      </div>

      {/* Welcome Text */}
      <h1 className="mt-4 text-2xl sm:text-3xl font-bold">Welcome to TruckSync</h1>

      {/* Language / Country Buttons */}
      <div className="flex space-x-4 mt-6">
        <div
          className="bg-white rounded-lg p-3 flex flex-col items-center justify-center shadow cursor-pointer hover:shadow-lg transition"
          onClick={() => handleLanguageSelection("en")}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
            alt="India"
            className="h-8 w-12 rounded"
          />
        </div>
        <div
          className="bg-white rounded-lg p-3 flex flex-col items-center justify-center shadow cursor-pointer hover:shadow-lg transition"
          onClick={() => handleLanguageSelection("ta")}
        >
          <span className="text-2xl">அ</span>
        </div>
      </div>

      {/* Login Button */}
      <div className="mt-8 w-full flex justify-center">
        <button
          className="bg-blue-600 text-white rounded-lg py-3 px-12 text-lg font-semibold hover:bg-blue-700 transition w-3/4 sm:w-1/3"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
