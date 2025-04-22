const express = require('express');
const { generateCertificate } = require('../../controllers/student-controller/certificate-controller');
const router = express.Router();

router.post('/certificate', generateCertificate); // <--- CHECK THIS ROUTE PATH

module.exports = router;