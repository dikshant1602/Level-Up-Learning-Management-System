const express = require("express");
const {
  getAllStudentsViewCourses,
  getAllStudentsViewCourseDetails,
} = require("../../controllers/student-controller/course-controller"); // Ensure correct import path

const router = express.Router();

// Define routes properly
router.get("/get", getAllStudentsViewCourses);
router.get("/get/details/:id", getAllStudentsViewCourseDetails);

module.exports = router;
