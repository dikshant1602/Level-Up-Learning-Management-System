// controllers/teacher-controller.js
const TeacherApplication = require('../../models/TeacherApplication');

// Create a new teacher application
exports.createTeacherApplication = async (req, res) => {
  try {
    const { name, email, phone, dob, education, experience, coverLetter, subject } = req.body;

    const newApplication = new TeacherApplication({
      name,
      email,
      phone,
      dob,
      education,
      experience,
      coverLetter,
      subject
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error submitting application', error: err });
  }
};
