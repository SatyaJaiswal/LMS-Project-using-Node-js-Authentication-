const express = require('express');
const router = express.Router();
const Student = require('../models/addstudent');

router.post('/addstudent', async (req, res) => {
    // Extract form data including batch checkboxes
    var name = req.body.fullName;
    var email = req.body.emailaddress;
    var username = req.body.username;
    var phone = req.body.whatsappNo;
    var pass = req.body.password;
    var batch1 = req.body.batch1 ? true : false;
    var batch2 = req.body.batch2 ? true : false;
    var batch3 = req.body.batch3 ? true : false;

    try {
        // Create a new student instance and save to MongoDB
        const student = new Student({
            fullName: name,
            emailaddress: email,
            username: username,
            whatsappNo: phone,
            password: pass,
            batch1: batch1,
            batch2: batch2,
            batch3: batch3
        });

        const studentdata =   await student.save()
        console.log(studentdata);
        res.redirect('/teacherindex')

    } catch (err) {
        console.log('Error: ' + err);
        res.status(500).send(err);
    }
});

module.exports = router;
