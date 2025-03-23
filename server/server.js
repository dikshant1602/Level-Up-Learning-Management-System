require("dotenv").config();  // Load environment variables first

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
import authRoutes from "./routes/auth-routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Debug: Log environment variables to check if they load
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);


app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
})); 

app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(" MongoDB is connected"))
  .catch((err) => console.log(" MongoDB connection error:", err));

// routes configuration
app.use("/auth", authRoutes);

// Error handling middleware (global error handler)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something's wrong",
  });
});

// Listen on PORT
app.listen(PORT, () => {
  console.log(`✅ Server is now running on port ${PORT}`);
});
