import React, { useState } from "react";
import axios from "axios";
import { Sprout, Ruler, Droplets, Sun, ChevronRight, CheckCircle2, FlaskConical } from "lucide-react";

export default function FertilizerPlanner() {
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.post("http://localhost:5000/api/fertilizer/create", {
        userId,
        ...form
      });

      setMessage({ text: res.data.message, type: "success" });

      const recommendations = {
        Nitrogen: `${form.landSize * 2} kg`,
        Phosphorus: `${form.landSize * 1.5} kg`,
        Potassium: `${form.landSize * 1} kg`,
      };

      setResult({ ...form, recommendations });
      setForm({ landSize: "", crop: "", soilType: "", season: "" });
    } catch (err) {
      setMessage({ text: "Server error - check your connection", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-emerald-900 mb-3">Precision Fertilizer Planner</h2>
          <p className="text-gray-500 max-w-lg mx-auto">Optimize your harvest with data-driven nutrient recommendations based on your specific soil and crop needs.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          
          {/* LEFT: THE INPUT FORM (2/5 width) */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl shadow-emerald-900/5 border border-emerald-100">
            <h3 className="text-lg font-bold text-emerald-800 mb-6 flex items-center gap-2">
              <FlaskConical size={20} className="text-orange-500" /> Plot Details
            </h3>

            {message.text && (
              <div className={`mb-6 p-4 rounded-xl text-sm font-bold flex items-center gap-2 ${
                message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"
              }`}>
                {message.type === "success" ? <CheckCircle2 size={18} /> : null}
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Land Size (Acres)</label>
                <div className="relative">
                  <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={18} />
                  <input
                    type="number"
                    name="landSize"
                    placeholder="e.g. 10"
                    value={form.landSize}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Crop Type</label>
                <div className="relative">
                  <Sprout className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={18} />
                  <input
                    type="text"
                    name="crop"
                    placeholder="e.g. Rice or Wheat"
                    value={form.crop}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Soil Type</label>
                  <select
                    name="soilType"
                    value={form.soilType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                  >
                    <option value="">Select</option>
                    <option value="Clay">Clay</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Loamy">Loamy</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Season</label>
                  <select
                    name="season"
                    value={form.season}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                  >
                    <option value="">Select</option>
                    <option value="Kharif">Kharif</option>
                    <option value="Rabi">Rabi</option>
                    <option value="Zaid">Zaid</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
              >
                {loading ? "Calculating..." : "Generate Plan"}
                {!loading && <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </div>

          {/* RIGHT: THE RESULT DISPLAY (3/5 width) */}
          <div className="lg:col-span-3">
            {!result ? (
              <div className="h-full min-h-[400px] border-2 border-dashed border-emerald-200 rounded-3xl flex flex-col items-center justify-center p-12 text-center bg-white/50">
                <div className="bg-emerald-100 p-6 rounded-full text-emerald-600 mb-4 animate-bounce">
                  <FlaskConical size={48} />
                </div>
                <h4 className="text-xl font-bold text-emerald-900">Waiting for Data</h4>
                <p className="text-gray-500 mt-2">Enter your land and crop details to generate a custom nutrition plan for your soil.</p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-emerald-900 p-8 text-white relative">
                  <div className="relative z-10">
                    <span className="bg-orange-500 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest">Official Plan</span>
                    <h3 className="text-3xl font-bold mt-4">Nutrition Report</h3>
                    <p className="text-emerald-200 opacity-80 mt-1">Optimization for {result.crop} • {result.season} Season</p>
                  </div>
                  <Sprout className="absolute right-8 top-8 opacity-10 w-32 h-32" />
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Land Size</p>
                      <p className="text-xl font-bold text-emerald-900">{result.landSize} Acres</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Soil Structure</p>
                      <p className="text-xl font-bold text-emerald-900">{result.soilType}</p>
                    </div>
                  </div>

                  <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Droplets className="text-blue-500" size={20} /> Required Fertilizer Dosage:
                  </h4>

                  <div className="space-y-3">
                    {[
                      { name: "Nitrogen (N)", val: result.recommendations.Nitrogen, color: "bg-blue-500" },
                      { name: "Phosphorus (P)", val: result.recommendations.Phosphorus, color: "bg-orange-500" },
                      { name: "Potassium (K)", val: result.recommendations.Potassium, color: "bg-emerald-500" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                          <span className="font-bold text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-lg font-black text-emerald-800">{item.val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-orange-50 rounded-2xl flex gap-3 items-start border border-orange-100">
                    <Sun className="text-orange-500 shrink-0 mt-1" size={18} />
                    <p className="text-xs text-orange-800 leading-relaxed">
                      <strong>Expert Advice:</strong> Apply 50% of Nitrogen during sowing and the remaining 50% after 30 days for maximum yield in {result.soilType} soil.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}