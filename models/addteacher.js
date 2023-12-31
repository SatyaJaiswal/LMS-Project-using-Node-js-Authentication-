const mongoose = require('mongoose');
const addTeacherSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
})

const addteacher = mongoose.model("teachers", addTeacherSchema)
module.exports = addteacher;