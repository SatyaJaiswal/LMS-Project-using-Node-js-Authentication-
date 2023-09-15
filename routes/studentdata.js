const express = require('express');
const router = express.Router();
const Student = require('../models/addstudent');

router.get('/', async (req, res, next) => {
  try {
    const data = await Student.find();
    res.render("teacherindex", { addstudent: data });
  } catch (error) {
    res.status(400).send("Invalid request");
  }
});

module.exports = router;
