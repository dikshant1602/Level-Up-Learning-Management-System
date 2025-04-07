const express = require("express");
const {
  getAllStudentViewCourses,
  getStudentViewCourseDetails,
  checkCoursePurchaseInfo
} = require("../../controllers/student-controller/course-controller"); // Ensure correct import path

const router = express.Router();

// Define routes properly
router.get("/get", getAllStudentViewCourses);
router.get("/get/details/:id", getStudentViewCourseDetails);
router.get("/purchase-info/:id/:studentId", checkCoursePurchaseInfo);

module.exports = router;
