const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  crop: String,
  quantity: Number,
  pickup: String,
  destination: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transport", transportSchema);
