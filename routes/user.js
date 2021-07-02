const fs = require('fs');
const express = require('express');
const router = express.Router();
const formidable = require('formidable');
// const csvtojson = require('csvtojson');
const excelToJson = require('convert-excel-to-json');
const moment = require('moment');

// Load Models
const { User, CSV } = require('../db/models');

// @route   GET /api/user/Test
// @desc    Test route
// @access  Public
router.get('/test', async (req, res) => res.status(200).json({ message: 'Test route working' }));

router.post('/csv-upload', async (req, res) => {
  const formData = formidable({
    uploadDir: './public/csv',
    keepExtensions: true,
    multiples: false,
  });

  formData.parse(req, async (error, fields, files) => {
    const { csv } = files;

    try {
      if (error) throw 'Unable to upload CSV!';

      // const jsonArray = await csvtojson().fromFile(csv.path);

      const result = excelToJson({
        sourceFile: csv.path,
      }).Sheet1;

      const storeData = [];

      for (let i = 1; i < result.length; i++) {
        storeData.push({
          fileName: csv.name,
          filePath: csv.path.split('public').pop(),
          Date: moment(result[i]['A'], 'DD.MM.YYYY').utcOffset(0),
          AttendentID: result[i]['C'],
          AttendentName: result[i]['D'],
          CustomerID: result[i]['E'],
          CustomerName: result[i]['F'],
          Name: result[i]['G'],
          ProductType: result[i]['H'],
          Description: result[i]['I'],
          ProductUnitPrice: result[i]['J'],
          ProductQuantityTotal: result[i]['K'],
          Amount: result[i]['L'],
        });
      }

      const csvData = await CSV.insertMany(storeData);

      if (!csvData) throw 'Unable to store the data!';

      const salesData = (csvData || []).filter((data) => data.ProductType === 'Sale');
      const servicesData = (csvData || []).filter((data) => data.ProductType === 'Service');
      const totalAmount = (csvData || []).reduce((a, b) => +a + +(b['Amount'] || 0), 0);

      const salesItems = [...new Set((salesData || [])?.map((data) => data.Name))];
      const servicesItems = [...new Set((servicesData || [])?.map((data) => data.Name))];

      const salesChartData = salesItems.map((item) => ({
        name: item,
        value: salesData.reduce((init, data) => {
          return data.Name === item ? init + +data.Amount : init;
        }, 0),
      }));

      const servicesChartData = servicesItems.map((item) => ({
        name: item,
        value: servicesData.reduce((init, data) => {
          return data.Name === item ? init + +data.Amount : init;
        }, 0),
      }));

      return res.status(200).json({
        success: true,
        csv: {
          csvData,
          salesData,
          servicesData,
          totalAmount,
          salesItems,
          servicesItems,
          salesChartData,
          servicesChartData,
        },
      });
    } catch (error) {
      console.log(error);
      if (csv) fs.unlinkSync(csv.path);
      return res.status(400).json({ success: false, message: error });
    }
  });
});

module.exports = router;
