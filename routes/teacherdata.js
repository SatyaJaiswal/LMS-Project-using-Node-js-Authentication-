const express = require('express')
const router = express.Router();
const User = require('../models/addteacher');

router.get('/', async function(req, res, next){

    var data = await User.find()
    res.render("index",{teacher1:data})
}
);
  
module.exports = router