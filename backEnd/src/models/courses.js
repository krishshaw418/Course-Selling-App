const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        unique: true
    },
    description:{
        type: String,
        require: false  
    },
    price:{
        type: Number,
        require: true
    },
    videoLink:{
        type: String
    },
    adminId:{
        type: String
    }
})

const Courses = mongoose.model('Courses', coursesSchema);

module.exports = Courses;