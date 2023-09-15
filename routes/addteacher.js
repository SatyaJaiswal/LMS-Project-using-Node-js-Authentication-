const express = require('express')
const router = express.Router();
const User = require('../models/addteacher');

router.post('/',async (req,res)=>{
    var name = req.body.fullName;
    var email = req.body.emailaddress;
    var username = req.body.username;
    var phone = req.body.phone;
    var pass = req.body.password;


    const user = new User({
        name:name,
        email:email,
        username:username,
        phone:phone,
        password:pass,
    })
     
     const teacher =   await user.save()
     console.log(teacher);
        res.redirect('/teacherdata')
    
})

module.exports = router;