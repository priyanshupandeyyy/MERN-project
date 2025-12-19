import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, TrendingUp, Truck, Leaf, Target } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 bg-emerald-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
            Bridging the Gap Between <br />
            <span className="text-orange-400">Harvest and Market</span>
          </h1>
          <p className="text-lg text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            AgriPool started with a simple idea: No farmer should have to struggle alone with high transport costs or guess their fertilizer needs. We are building a tech-driven community for the modern agriculturist.
          </p>
        </div>
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-800 rounded-full opacity-50 blur-3xl"></div>
      </section>

      {/* 2. OUR MISSION & VISION */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block p-3 bg-orange-100 rounded-2xl mb-4">
              <Target className="w-8 h-8 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Our mission is to empower small and medium-scale farmers by providing access to 
              <strong> smart logistics</strong> and <strong>data-driven farming plans</strong>. 
              By pooling resources, we reduce the carbon footprint and increase the profit 
              margins for those who feed the world.
            </p>
            <ul className="space-y-4">
              {[
                "Reducing transport costs by up to 25%",
                "Parcel-specific fertilizer optimization",
                "Building a transparent farmer-transporter network"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <ShieldCheck className="text-emerald-600 w-5 h-5" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=2072&auto=format&fit=crop" 
              alt="Community Farming" 
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES - Simple Grid */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose AgriPool?</h2>
            <div className="w-20 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Truck className="text-emerald-700" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Logistics</h3>
              <p className="text-gray-600">We connect you with nearby farmers to fill trucks to capacity, saving money for everyone involved.</p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="text-emerald-700" />
              </div>
              <h3 className="text-xl font-bold mb-3">Precision Growth</h3>
              <p className="text-gray-600">Our algorithms analyze soil and crop data to provide exact input plans, reducing waste and chemicals.</p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="text-emerald-700" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust & Security</h3>
              <p className="text-gray-600">Verified transporters and transparent pricing ensure that your produce is always in safe hands.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-emerald-900">Ready to transform your farm?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-200 transition-all">
              Join the Pool
            </Link>
            <Link to="/contact" className="bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-10 py-4 rounded-xl font-bold text-lg transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;