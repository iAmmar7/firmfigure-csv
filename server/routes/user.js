const express = require("express");
const router = express.Router();

// Load Models
const { User } = require("../db/models");

// @route   GET /api/user/Test
// @desc    Test route
// @access  Public
router.get("/test", async (req, res) =>
  res.status(200).json({ message: "Test route working" })
);

module.exports = router;
