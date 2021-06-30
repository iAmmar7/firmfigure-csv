const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CSVSchema = new Schema(
  {
    filePath: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    AttendentID: {
      type: String,
    },
    CustomerID: {
      type: String,
    },
    CustomerName: {
      type: String,
    },
    Name: {
      type: String,
    },
    ProductType: {
      type: String,
    },
    Description: {
      type: String,
    },
    ProductUnitPrice: {
      type: String,
    },
    ProductQuantityTotal: {
      type: String,
    },
    Amount: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = CSV = mongoose.model('csv', CSVSchema);
