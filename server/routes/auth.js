const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, phone, password, role } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phone,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.json({ error: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ error: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      message: "Login success",
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "Server error" });
  }
});

module.exports = router;
