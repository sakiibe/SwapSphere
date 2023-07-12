
const express = require('express')
const router = express.Router()
const swaggerAnnotations = require('../swagger-annotations');
const product = require('../models/product');
const user = require('../models/user');
const wishlist = require('../models/wishlist');
module.exports = router

// add a new user

router.post('/add', async (req, res) => {
    try {
      // Create a new user based on the request body
      const newUser = new user({
        firstName: req.body.firstName,
        email: req.body.email
      });
  
      // Save the new user to the database
      const savedUser = await newUser.save();
  
      res.status(201).json(savedUser); // Respond with the saved user object
    } catch (error) {
      res.status(500).json({ error: 'Failed to add user' });
    }
  });
