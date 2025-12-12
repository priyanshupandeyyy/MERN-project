const express = require("express");
const Fertilizer = require("../models/fertilizer");
const router = express.Router();

// CREATE Fertilizer Plan
router.post("/create", async (req, res) => {
  try {
    const { userId, landSize, crop, soilType, season } = req.body;

    const newPlan = new Fertilizer({
      userId,
      landSize,
      crop,
      soilType,
      season
    });

    await newPlan.save();
    res.json({ message: "Fertilizer plan saved!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET ALL Fertilizer Plans
router.get("/all", async (req, res) => {
  try {
    const plans = await Fertilizer.find().populate("userId", "name phone");
    res.json(plans);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
