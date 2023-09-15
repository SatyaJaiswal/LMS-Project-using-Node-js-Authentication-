const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/lms');

const db = mongoose.connection;
db.on('err',()=>{
    console.log("err");
});
db.once('open',()=>{
    console.log("connected");
})