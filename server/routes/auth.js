const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Load Models
const User = require("../db/models/User");

// @route   GET /api/auth/Test
// @desc    Test route
// @access  Public
router.get("/test", async (req, res) =>
  res.status(200).json({ message: "Test route working" })
);

// @route   POST /api/auth/user/signup
// @desc    user Signup
// @access  Public
router.post("/user/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "Account already exist with this Badge Number",
    });
  } else {
    // const newUser = await User.create({ name, badgeNumber, password, role });
    // if (!newUser) return res.status(400).json({ success: false, message: 'Unable to signup' });
    // newUser.password = null;
    // return res.status(200).json({ success: true, user: newUser });

    const newUser = new User({ name, email, password });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.status(200).json({ success: true, user }))
          .catch(err =>
            res
              .status(400)
              .json({ success: false, message: "Unable to signup" })
          );
      });
    });
  }
});

// @route   GET /api/auth/user/login
// @desc    User Login
// @access  Public
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User does not exist" });
  }

  // Check for Password
  bcrypt.compare(password, user.password).then(isMatch => {
    if (isMatch) {
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      // Sign Token
      jwt.sign(
        payload,
        process.env.PASSPORT_SECRET,
        { expiresIn: "7d" },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
            user: payload,
          });
        }
      );
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Password Incorrect" });
    }
  });
});

module.exports = router;
