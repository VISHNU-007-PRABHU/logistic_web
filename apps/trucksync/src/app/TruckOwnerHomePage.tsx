import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiHome, FiList, FiUser } from "react-icons/fi";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import L from "leaflet";

const TruckOwnerHomePage: React.FC = () => {
  const navigate = useNavigate();

  const route: [number, number][] = [
    [13.0827, 80.2707], // Chennai
    [13.1827, 80.3707], // Mid point
    [13.2827, 80.4707], // Destination
  ];

  const icon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
  });

  const [eta, setEta] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedEta = `${Math.floor(eta / 60)}:${String(eta % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="flex items-center p-4 space-x-2">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <FiArrowLeft className="text-2xl" />
        </button>
        <h1 className="text-xl font-bold">Truck Owner Home</h1>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapContainer
          center={route[0]}
          zoom={12}
          style={{ height: "300px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline positions={route} color="blue" />
          {route.map((position, idx) => (
            <Marker key={idx} position={position} icon={icon} />
          ))}
        </MapContainer>
      </div>

      {/* ETA Card */}
      <div className="bg-white rounded-t-2xl p-4 mt-[-30px] shadow-lg">
        <div className="bg-gray-100 rounded p-3 text-center text-lg font-semibold animate-bounce">
          ETA: {formattedEta}
        </div>
      </div>

      {/* Bottom Navbar */}
      <div className="flex justify-around items-center p-3 bg-white rounded-t-2xl border-t">
        <button
          onClick={() => navigate("/home")}
          className="flex flex-col items-center text-blue-600"
        >
          <FiHome className="text-2xl" />
        </button>
        <button
          onClick={() => navigate("/trip-history")}
          className="flex flex-col items-center text-gray-600"
        >
          <FiList className="text-2xl" />
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center text-gray-600"
        >
          <FiUser className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default TruckOwnerHomePage;
