const mongoose = require('mongoose');

const addStudentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    emailaddress: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    whatsappNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    batch1: {
        type: String
    },
    batch2: {
        type: String
    },
    batch3: {
        type: String
    }

});

const Student = mongoose.model("Student", addStudentSchema); // Use "Student" as the model name
module.exports = Student;
