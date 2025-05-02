// routes/teacher-routes.js
const express = require('express');
const { createTeacherApplication } = require('../../controllers/teacher-controller/teacher-controller');


const router = express.Router();

// Route to handle new teacher application
router.post('/apply', createTeacherApplication);

module.exports = router;
