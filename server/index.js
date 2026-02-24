require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const contactRoutes = require('./routes/contact');
const app = express();
const transportRoutes = require('./routes/transport');

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "AgriPool backend is running..." });
});
app.use("/api/auth", authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/transport', transportRoutes);
const fertilizerRoutes = require("./routes/fertilizer");
app.use("/api/fertilizer", fertilizerRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB Error =>", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
