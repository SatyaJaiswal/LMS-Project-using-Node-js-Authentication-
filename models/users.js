const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
});

const User = mongoose.model("table", userSchema);
module.exports = User;