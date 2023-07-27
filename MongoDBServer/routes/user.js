const express = require('express')
const router = express.Router()
const swaggerAnnotations = require('../swagger-annotations');
const product = require('../models/product');
const user = require('../models/user');
const forgotPasswordToken = require('../models/forgotPasswordTokens');
const wishlist = require('../models/wishlist');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
module.exports = router
const { protectRoute } = require('../middleware/authMiddleware');
const authenticationTokens = require('../models/authenticationTokens');
// add a new user

router.post('/register', asyncHandler(async (req, res) => {
  try {
    // Create a new user based on the request body
    const existingUser = await user.findOne({ email: req.body.email });
    if (existingUser) {
      // console.log("savedUser");
      return res.status(400).json({ error: 'Email already exists' });
    }
    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(200).json({
      _id: newUser.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    }); // Respond with the saved user object
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
}));

router.post('/login', asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await user.findOne({ email });
    if (!User || !(await bcrypt.compare(password, User.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // user id ,token email 
    const token = generateToken(User.email)
    const authToken = await authenticationTokens.findOne({ email });
    if (authToken) {
      authToken.token = token;
      await authToken.save();
    } else {
      const newAuthToken = new authenticationTokens({
        email: email,
        token: token,
      });
      // Save the new user to the database
      await newAuthToken.save();
    }
    res.status(200).json({ status: 'true', token: token, email: email });
  } catch (error) {
    res.status(500).json({ status: error });
  }
}));

router.post('/forgotpassword', asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    // user id ,token email 
    const token = generateToken(email)
    const authToken = await authenticationTokens.findOne({ email });
    if (authToken) {
      authToken.token = token;
    } else {
      const newAuthToken = new authenticationTokens({
        email: email,
        token: token,
      });
      // Save the new user to the database
      await newAuthToken.save();
    }
    res.status(200).json({ status: 'true', token: token });
  } catch (error) {
    res.status(500).json({ status: 'false' });
  }
}));

router.post('/checkTokens', asyncHandler(async (req, res) => {
  try {
    // Create a new user based on the request body
    const authToken = await authenticationTokens.findOne({ token: req.body.token });
    // console.log(authToken)
    if (authToken) {
      console.log("savedUser");
      res.status(201).json({
        status: "true",
      });
    } else {
      res.status(201).json({
        status: "false",
      });
    }
    // Respond with the saved user object
  } catch (error) {
    res.status(500).json({ status: 'false' });
  }
}));


router.delete('/deleteTokens', asyncHandler(async (req, res) => {
  try {
    const { token } = req.body; // Get the token value from the request body
    const authToken = await authenticationTokens.findOne({ token }); // Find the token in the database based on its value
    if (authToken) {
      await authToken.deleteOne(); // If the token exists, delete it
      res.status(201).json({
        status: "true",
      });
    } else {
      res.status(201).json({
        status: "false",
      });
    }
  } catch (error) {
    res.status(500).json({ status: 'false' });
  }
}));


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

router.get('/me', protectRoute, asyncHandler(async (req, res) => {
  res.status(200).json({ message: ' all ok ' });
}));