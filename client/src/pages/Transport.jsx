import React, { useState } from "react";
import axios from "axios";

export default function Transport() {
  const [form, setForm] = useState({
    crop: "",
    quantity: "",
    pickup: "",
    destination: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const requestTransport = async (transporter) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/transport/assign",
      { ...form, transporter }
    );

    alert("Transporter Assigned Successfully!");
    console.log(res.data);
  } catch (err) {
    console.error("Error assigning transporter", err);
  }
};

  const dummyTransporters = [
    { name: "Amit Transport Services", capacity: "2000 kg", phone: "9876543210" },
    { name: "Ravi Goods Carrier", capacity: "1500 kg", phone: "9123456780" },
    { name: "Kisan Truck Pool", capacity: "3000 kg", phone: "9801234567" }
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const userId = localStorage.getItem("userId"); // store userId at login

  try {
    await axios.post("http://localhost:5000/api/transport/create", {
      userId,
      ...form
    });

    setSubmitted(true);
  } catch (err) {
    console.log(err);
    alert("Server error");
  }
};

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Transport Pooling
        </h2>

        {/* Transport Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="crop"
            placeholder="Crop Name (e.g., Wheat, Tomato)"
            value={form.crop}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity (in Kg)"
            value={form.quantity}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            type="text"
            name="pickup"
            placeholder="Pickup Location"
            value={form.pickup}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            type="text"
            name="destination"
            placeholder="Destination (Market)"
            value={form.destination}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Submit Transport Request
          </button>
        </form>

        {/* Submitted Info */}
        {submitted && (
          <div className="mt-6 bg-green-100 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-green-700 mb-2">
              Your Transport Request
            </h3>
            <p><strong>Crop:</strong> {form.crop}</p>
            <p><strong>Quantity:</strong> {form.quantity} kg</p>
            <p><strong>Pickup:</strong> {form.pickup}</p>
            <p><strong>Destination:</strong> {form.destination}</p>
          </div>
        )}

        {/* Available Transporters */}
        <h3 className="text-xl font-bold text-green-700 mt-8 mb-4">
          Available Transporters
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dummyTransporters.map((t, idx) => (
            <div key={idx} className="bg-white border rounded-lg p-4 shadow hover:scale-105 transition">
              <h4 className="text-lg font-bold text-green-700">{t.name}</h4>
              <p>Capacity: {t.capacity}</p>
              <p>Contact: {t.phone}</p>
              <button
                    onClick={() => requestTransport(t)}
                    className="mt-3 bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700"
                    >
                    Request Transport
                </button>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
