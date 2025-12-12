const express = require("express");
const Transport = require("../models/transport");
const router = express.Router();

// CREATE TRANSPORT REQUEST
router.post("/create", async (req, res) => {
  try {
    const { userId, crop, quantity, pickup, destination } = req.body;

    const newRequest = new Transport({
      userId,
      crop,
      quantity,
      pickup,
      destination
    });

    await newRequest.save();
    res.json({ message: "Transport request saved!" });

  } catch (err) {
    console.log(err);
    res.json({ error: "Server error" });
  }
});

// GET ALL TRANSPORT REQUESTS
router.get("/all", async (req, res) => {
  try {
    const data = await Transport.find().populate("userId", "name phone");
    res.json(data);
  } catch (err) {
    res.json({ error: "Server error" });
  }
});

module.exports = router;
