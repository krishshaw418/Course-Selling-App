const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        min: 3,
        max: 20
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    uploadedCourses:{
        type:Array,
        default:[]
    }
})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;