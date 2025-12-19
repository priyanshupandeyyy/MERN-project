import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import FertilizerPlanner from "./pages/FertilizerPlanner";
import Transport from "./pages/Transport";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
export default function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
       
        <Route path="/fertilizer" element={<FertilizerPlanner />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/contact" element={<Contact />} />
         <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}
