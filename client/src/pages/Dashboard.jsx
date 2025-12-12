import React from "react";

export default function Dashboard() {
  const handleTransportClick = () => {
  window.location.href = "/transport";
};

  
  const handleFertilizerClick = () => {
  window.location.href = "/fertilizer";
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-green-700 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">AgriPool</h1>
        <button
          onClick={handleLogout}
          className="bg-white text-green-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Logout
        </button>
      </header>

      {/* Main Section */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transport Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between hover:scale-105 transform transition">
          <h2 className="text-xl font-bold mb-4 text-green-700">Transport Pooling</h2>
          <p className="text-gray-700 mb-4">
            Share your produce or find transporters for pooled shipping to markets.
          </p>
          <button
            onClick={handleTransportClick}
            className="bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Go to Transport
          </button>
        </div>

        {/* Fertilizer Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between hover:scale-105 transform transition">
          <h2 className="text-xl font-bold mb-4 text-green-700">Fertilizer Planner</h2>
          <p className="text-gray-700 mb-4">
            Generate customized fertilizer plans for your land parcels to maximize yield.
          </p>
          <button
            onClick={handleFertilizerClick}
            className="bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Generate Plan
          </button>
        </div>
      </main>
    </div>
  );
}
