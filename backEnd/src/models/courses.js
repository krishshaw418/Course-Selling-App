const mongoose = require('mongoose');

const coursesSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    desciption:{
        type: String,
        require: false  
    },
    price:{
        type: Number,
        require: true
    }
})

const Courses = mongoose.model('Courses', coursesSchema);

module.exports = Courses;