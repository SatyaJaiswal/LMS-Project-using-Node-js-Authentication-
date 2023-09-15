var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const user = require("../models/addteacher");
/* GET home page. */
router.post('/', async function(req, res, next) {
  try {
      const uemail = req.body.email;
      const pword = req.body.password;
      
      // Authentication process
      const addstudent = await user.find({ email: uemail });
      console.log(addstudent);
      console.log(addstudent.length)
      console.log(addstudent[0].password)
      if (addstudent.length > 0 && addstudent[0].password === pword) {
          // Redirect to teacherindex page
          res.redirect('/teacherindex');
      } else {
          res.send("Invalid email and password");
      }
  } catch (error) {
      res.status(400).send("Invalid email and password");
  }
});

module.exports = router;