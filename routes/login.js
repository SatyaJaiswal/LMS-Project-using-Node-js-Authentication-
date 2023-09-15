const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/users'); // Rename the imported user model
const session = require('express-session');

// In your login router
router.post('/', async function (req, res, next) {
  try {
    const email = req.body.email;
    const pword = req.body.password;

    // Authentication process
    const foundUser = await userModel.findOne({ email: email }); // Rename the variable

    if (foundUser && foundUser.password === pword) {
      // Store user data in session
      req.session.userData = {
        email: foundUser.email,
        password: foundUser.password,
      };

      res.redirect('/teacherdata');
    } else {
      res.send('Invalid username and password');
    }
  } catch (error) {
    res.status(400).send('Invalid username and password');
  }
});

// In your admin dashboard route (e.g., teacherdata)
router.get('/teacherdata', function (req, res, next) {
  if (req.session.userData) {
    
    const user = req.session.userData; // Rename the variable
    res.render('header', { user: user }); // Pass user data to the header template as "user"
  } else {
    res.redirect('/login'); // Redirect to the login page if not logged in
  }
});

module.exports = router;
