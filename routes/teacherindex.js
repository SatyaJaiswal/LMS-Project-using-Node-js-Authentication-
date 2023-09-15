const express = require('express')
const router = express.Router();

const Model = require("../models/addstudent");

router.get('/', async function(req, res, next) {
    var data = await Model.find();
    console.log('dataaa',data);

    res.render("teacherindex", { addstudent : data});
});

module.exports = router;