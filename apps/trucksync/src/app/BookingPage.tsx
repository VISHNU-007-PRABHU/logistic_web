import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import L from "leaflet";

const BookingPage: React.FC = () => {
  const navigate = useNavigate();

  const [dropLocation, setDropLocation] = useState({ lat: 13.0827, lng: 80.2707 }); // Chennai by default
  const [goodsType, setGoodsType] = useState("Weight");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const pricing = useMemo(() => {
    switch (goodsType) {
      case "Weight":
        return 1000;
      case "Volume":
        return 1200;
      case "Refrigerated":
        return 1500;
      case "Other":
        return 800;
      default:
        return 1000;
    }
  }, [goodsType]);

  const handleConfirmAndPay = async () => {
    if (!date || !goodsType) {
      setError("Please fill in all required fields");
      return;
    }

    setError("");
    setIsProcessing(true);

    // 🌟 Simulate Payment
    setTimeout(() => {
      alert(`✅ Payment of Rs.${pricing} successful!`);

      // 📧 Simulated Email confirmation
      console.log("✉️ Email confirmation sent for booking:", {
        dropLocation,
        goodsType,
        date,
        pricing,
      });

      setSuccess(true);
      setIsProcessing(false);

      // Reset after delay
      setTimeout(() => {
        navigate("/payment-success");
      }, 1000);
    }, 1500);
  };
  
  // Map Click Event
  const LocationSelector = () => {
    useMapEvents({
      click: (e) => {
        setDropLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };
  
  return (
    <div className="min-h-screen flex flex-col p-4 bg-gray-50">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <button onClick={() => navigate(-1)} className="text-gray-600">
          <FiArrowLeft className="text-2xl" />
        </button>
        <h1 className="text-xl font-bold">Booking</h1>
      </div>

      {/* Interactive Map */}
      <div className="mt-4 rounded-lg overflow-hidden">
        <MapContainer
          center={dropLocation}
          zoom={13}
          style={{ height: "250px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <LocationSelector />
          
          <Marker
            position={dropLocation}
            icon={L.icon({
              iconUrl:
                "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              iconSize: [30, 30],
            })}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target as L.Marker;
                const position = marker.getLatLng();
                setDropLocation({ lat: position.lat, lng: position.lng });
              },
            }}
          />
        </MapContainer>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg p-4 mt-4 space-y-4">
        <div className="space-y-1">
          <label className="text-gray-700 font-medium">Drop Location (Lat, Lng)</label>
          <input
            readOnly
            value={`${dropLocation.lat.toFixed(4)}, ${dropLocation.lng.toFixed(4)}`}
            className="w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-gray-700 font-medium">Goods Type *</label>
          <select
            value={goodsType}
            onChange={(e) => setGoodsType(e.target.value)}
            className="w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          >
            <option>Weight</option>
            <option>Volume</option>
            <option>Refrigerated</option>
            <option>Other</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-gray-700 font-medium">Truck Date *</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full rounded border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="text-gray-800 font-bold">Total Price: Rs. {pricing}</div>

        {error && <div className="text-red-600 text-sm animate-bounce">{error}</div>}
        {success && (
          <div className="text-green-600 text-sm animate-fadeIn">✅ Booking confirmed! Redirecting...</div>
        )}

        <div className="pt-4">
          <button
            onClick={handleConfirmAndPay}
            disabled={isProcessing}
            className={`bg-blue-600 text-white rounded-lg py-3 w-full font-semibold hover:bg-blue-700 transition 
              ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isProcessing ? "Processing Payment..." : "Confirm & Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
