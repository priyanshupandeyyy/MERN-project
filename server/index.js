require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ message: "AgriPool backend is running..." });
});

// routes
app.use("/api/auth", authRoutes);

const transportRoutes = require("./routes/transport");
app.use("/api/transport", transportRoutes);

const fertilizerRoutes = require("./routes/fertilizer");
app.use("/api/fertilizer", fertilizerRoutes);
// connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB Error =>", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
