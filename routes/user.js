const fs = require('fs');
const express = require('express');
const router = express.Router();
const formidable = require('formidable');

// Load Models
const { User } = require('../db/models');

// @route   GET /api/user/Test
// @desc    Test route
// @access  Public
router.get('/test', async (req, res) => res.status(200).json({ message: 'Test route working' }));

router.post('/upload-csv', async (req, res) => {
  const formData = formidable({
    uploadDir: './public/csv',
    keepExtensions: true,
    multiples: false,
  });

  formData.parse(req, async (error, fields, files) => {
    const { csv } = files;
    console.log('CSV Upload', csv);

    try {
      if (error) throw 'Unable to upload image!';

      return res.status(200).json({ success: true, report });
    } catch (error) {
      if (csv) fs.unlinkSync(csv.path);
      return res.status(400).json({ success: false, message: error });
    }
  });
});

module.exports = router;
