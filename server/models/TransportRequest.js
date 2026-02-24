const mongoose = require("mongoose");

const transportRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending", 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TransportRequest", transportRequestSchema);
