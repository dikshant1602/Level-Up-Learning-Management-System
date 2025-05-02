// models/TeacherApplication.js
const mongoose = require('mongoose');

const teacherApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  education: { type: String, required: true },
  experience: { type: String, required: false },
  coverLetter: { type: String, required: false },
  subject: { type: String, required: true },
}, { timestamps: true });

const TeacherApplication = mongoose.model('TeacherApplication', teacherApplicationSchema);

module.exports = TeacherApplication;
