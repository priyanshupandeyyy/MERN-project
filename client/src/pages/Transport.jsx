import React, { useState } from 'react';
import axios from 'axios';
import { Truck, MapPin, Package, Navigation, Send, Info } from 'lucide-react';

const Transport = () => {
  const [formData, setFormData] = useState({
    cropName: '',
    quantity: '',
    pickupLocation: '',
    destination: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      const res = await axios.post("http://localhost:5000/api/transport/request", {
        userId,
        ...formData
      });
      setMessage({ text: "Request submitted! Finding nearby farmers for pooling...", type: 'success' });
      setFormData({ cropName: '', quantity: '', pickupLocation: '', destination: '' });
    } catch (err) {
      setMessage({ text: "Error submitting request. Please login again.", type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50/50 pt-28 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-emerald-900 mb-3 flex items-center justify-center gap-3">
            <Truck className="text-orange-500 w-10 h-10" /> Transport Pooling
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Save up to 30% on logistics by sharing truck space with farmers heading to the same market.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 items-start">
          
          {/* Left Side: Instructions/Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-100">
              <h3 className="font-bold text-emerald-800 flex items-center gap-2 mb-4">
                <Info size={18} /> How it works
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-gray-600">
                  <div className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold">1</div>
                  Enter your crop details and total weight.
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <div className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold">2</div>
                  Set your farm location and target market.
                </li>
                <li className="flex gap-3 text-sm text-gray-600">
                  <div className="bg-emerald-100 text-emerald-700 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold">3</div>
                  We match you with others to fill a truck!
                </li>
              </ul>
            </div>

            <div className="bg-orange-500 p-6 rounded-2xl text-white shadow-lg shadow-orange-200">
              <h4 className="font-bold mb-2">Pro Tip:</h4>
              <p className="text-sm opacity-90">Pooling works best for quantities between 500kg and 2000kg.</p>
            </div>
          </div>

          {/* Right Side: The Form Card */}
          <div className="md:col-span-3 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            {message.text && (
              <div className={`mb-6 p-4 rounded-xl text-center text-sm font-bold ${
                message.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <label className="text-xs font-bold text-gray-400 uppercase ml-2 mb-1 block">Crop Details</label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={20} />
                  <input
                    type="text"
                    name="cropName"
                    placeholder="Crop Name (e.g., Wheat, Tomato)"
                    value={formData.cropName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-xs font-bold text-gray-400 uppercase ml-2 mb-1 block">Total Weight</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 font-bold text-sm">KG</span>
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity (in Kg)"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-2 mb-1 block">From</label>
                  <MapPin className="absolute left-4 top-[3.2rem] -translate-y-1/2 text-emerald-600" size={20} />
                  <input
                    type="text"
                    name="pickupLocation"
                    placeholder="Pickup Location"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-2 mb-1 block">To</label>
                  <Navigation className="absolute left-4 top-[3.2rem] -translate-y-1/2 text-emerald-600" size={20} />
                  <input
                    type="text"
                    name="destination"
                    placeholder="Destination (Market)"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-emerald-200 transition-all active:scale-[0.98] mt-4"
              >
                Submit Transport Request <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transport;