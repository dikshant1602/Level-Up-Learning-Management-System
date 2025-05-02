import React, { useState } from 'react';

const TeacherApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    education: '',
    experience: '',
    coverLetter: '',
    subject: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/teacher/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  // Send form data as JSON
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Application submitted:', data);
        alert('Your application has been submitted!');
      } else {
        console.error('Error:', data);
        alert('Error submitting application');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting application');
    }
  
    // Clear the form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      dob: '',
      education: '',
      experience: '',
      coverLetter: '',
      subject: '',
    });
  };
  

  return (
    <div className="p-6 bg-white min-h-screen text-gray-900 flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-black text-center">Instructor Application</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-800 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-200 text-black border border-gray-300"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-800 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-200 text-black border border-gray-300"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-800 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-200 text-black border border-gray-300"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-800 mb-1">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-200 text-black border border-gray-300"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-800 mb-1">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-200 text-black border border-gray-300"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-800 mb-1">Experience (Optional)</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-200 text-black border border-gray-300"
              rows="3"
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-800 mb-1">Cover Letter (Optional)</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-200 text-black border border-gray-300"
              rows="3"
            />
          </div>

          <div className="mb-3">
            <label className="block text-gray-800 mb-1">Subject You Want to Teach</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-200 text-black border border-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherApplicationForm;
