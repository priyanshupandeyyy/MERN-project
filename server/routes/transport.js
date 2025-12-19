const express = require("express");
const TransportRequest = require("../models/TransportRequest");

const router = express.Router();

// CREATE TRANSPORT REQUEST
router.post("/request", async (req, res) => {
  try {
    const { userId, cropName, quantity, pickupLocation, destination } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "User not logged in" });
    }

    const newRequest = new TransportRequest({
      userId,
      cropName,
      quantity,
      pickupLocation,
      destination,
    });

    await newRequest.save();

    res.json({
      message: "Transport request saved successfully",
      request: newRequest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
