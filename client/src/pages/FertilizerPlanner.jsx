import React, { useState } from "react";
import axios from "axios";

export default function FertilizerPlanner() {

  const [message, setMessage] = useState(""); // show backend success/error

  const [form, setForm] = useState({
    landSize: "",
    crop: "",
    soilType: "",
    season: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const userId = localStorage.getItem("userId"); // get logged-in user ID

  try {
    // Save plan to backend
    const res = await axios.post("http://localhost:5000/api/fertilizer/create", {
      userId,
      ...form
    });

    setMessage(res.data.message); // show success message

    // Local recommendation calculation
    const recommendations = {
      Nitrogen: `${form.landSize * 2} kg`,
      Phosphorus: `${form.landSize * 1.5} kg`,
      Potassium: `${form.landSize * 1} kg`,
    };

    setResult({ ...form, recommendations });

    // Optional: reset form
    setForm({ landSize: "", crop: "", soilType: "", season: "" });
  } catch (err) {
    console.log(err);
    setMessage("Server error");
  }
};


  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Fertilizer Planner
        </h2>
        {message && <p className="text-center text-green-600 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="landSize"
            placeholder="Land Size (in Acres)"
            value={form.landSize}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          <input
            type="text"
            name="crop"
            placeholder="Crop Type (e.g., Wheat, Rice)"
            value={form.crop}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          />

          <select
            name="soilType"
            value={form.soilType}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="">Select Soil Type</option>
            <option value="Clay">Clay</option>
            <option value="Sandy">Sandy</option>
            <option value="Loamy">Loamy</option>
          </select>

          <select
            name="season"
            value={form.season}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="">Select Season</option>
            <option value="Kharif">Kharif</option>
            <option value="Rabi">Rabi</option>
            <option value="Zaid">Zaid</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Generate Plan
          </button>
        </form>

        {result && (
          <div className="mt-6 bg-green-100 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-green-700 mb-2">
              Fertilizer Recommendation
            </h3>

            <p><strong>Crop:</strong> {result.crop}</p>
            <p><strong>Soil Type:</strong> {result.soilType}</p>
            <p><strong>Season:</strong> {result.season}</p>

            <h4 className="font-bold mt-4 mb-2">Required Fertilizers:</h4>
            <ul className="list-disc ml-6">
              <li>Nitrogen: {result.recommendations.Nitrogen}</li>
              <li>Phosphorus: {result.recommendations.Phosphorus}</li>
              <li>Potassium: {result.recommendations.Potassium}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
