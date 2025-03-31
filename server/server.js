// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes/index.js'); // Use `require` here
const mediaRoutes = require('./routes/auth-routes/instructor-routes/media-routes.js'); // Use `require` here
const instructorCourseRoutes = require('./routes/auth-routes/instructor-routes/course-routes.js');
const studentViewCourseRoutes = require("./routes/student-routes/course-routes.js");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Debug logs
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use("/auth", authRoutes);  // Routes middleware
app.use("/media", mediaRoutes); // Routes middleware
app.use("/instructor/course", instructorCourseRoutes);
app.use("/student/course", studentViewCourseRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong.",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is now running on port ${PORT}`);
});
