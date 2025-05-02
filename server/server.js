// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes/index.js'); // Use `require` here
const mediaRoutes = require('./routes/auth-routes/instructor-routes/media-routes.js'); // Use `require` here
const instructorCourseRoutes = require('./routes/auth-routes/instructor-routes/course-routes.js');
const studentViewCourseRoutes = require("./routes/student-routes/course-routes.js");
const studentViewOrderRoutes = require("./routes/student-routes/order-routes.js");
const studentCoursesRoutes = require("./routes/student-routes/student-courses-routes.js");
const studentCourseProgressRoutes = require("./routes/student-routes/course-progress-routes.js");
// Import the student certificate routes
const studentCertificateRoutes = require("./routes/student-routes/student-certificate.js");
const teacherRoutes = require("./routes/teacher-routes/teacher-routes.js");


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
app.use("/student/order", studentViewOrderRoutes);
app.use("/student/courses-bought", studentCoursesRoutes);
app.use("/student/course-progress", studentCourseProgressRoutes);
// Mount the student certificate routes
app.use("/api/student", studentCertificateRoutes); // <--- VERY IMPORTANT: CHECK THIS PREFIX
app.use('/api/teacher', teacherRoutes);


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