const path = require('path');
const PDFDocument = require('pdfkit');

exports.generateCertificate = async (req, res) => {
  const { studentName, courseName, instructorName } = req.body;

  const safeCourseName = courseName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const safeStudentName = studentName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const fileName = `${safeStudentName}-${safeCourseName}-certificate.pdf`;

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

  const doc = new PDFDocument();
  doc.pipe(res);  // Stream PDF directly to response

  const issueDate = new Date().toLocaleDateString();

  // Logo - make sure the path is correct relative to this file
  const logoPath = path.join(__dirname, '../../../assets/logo.png');
  try {
    doc.image(logoPath, 50, 30, { width: 100 });
  } catch (err) {
    console.error('Logo not found:', err.message);
  }

  doc.moveDown(4);
  doc.fontSize(14).fillColor('#000').text(`Date of Issue: ${issueDate}`, { align: 'center' });

  // Header
  doc.fontSize(28).fillColor('#4F46E5').text('Level-Up Academy', { align: 'center' });
  doc.moveDown(1.5);

  // Title
  doc.fillColor('#000').fontSize(24).text('Certificate of Completion', { align: 'center' });
  doc.moveDown();

  // Body
  doc.fontSize(16).text('This is to certify that', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(20).fillColor('#111827').text(studentName, { align: 'center', underline: true });
  doc.moveDown(1);
  doc.fillColor('#000').fontSize(16).text('has successfully completed the course', { align: 'center' });
  doc.moveDown(0.5);
  doc.fontSize(18).fillColor('#111827').text(courseName, { align: 'center', underline: true });
  doc.moveDown(2);

  // Signature
// Signature Image
//const signaturePath = path.join(__dirname, '../../../assets/signatures/signature.png');
const signaturePath = path.join(__dirname, '../../assets/signatures/signature.png');
// Positioning and image size
const signatureWidth = 150;
const signatureHeight = 50;  // You can adjust the height according to how you want the signature to appear

// Add the signature image to the PDF
doc.image(signaturePath, 220, doc.y, { 
  width: signatureWidth, 
  height: signatureHeight,
  align: 'center' 
});

// Move the document down after the signature image to avoid overlap with subsequent text
doc.moveDown(3);
doc.fontSize(12).fillColor('#6B7280').text(instructorName, { align: 'center' });


  // Footer
  doc.moveDown(2);
  doc.fontSize(14).fillColor('#6B7280').text(`Taught by: ${instructorName}`, { align: 'center' });
  doc.moveDown(1);
  doc.fontSize(12).fillColor('#9CA3AF').text('Issued by Level-Up Academy • www.levelup.com', {
    align: 'center',
  });

  doc.end(); // Finalize PDF and end the response
};
