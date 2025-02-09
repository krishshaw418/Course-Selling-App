const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    purchasedCoursesId:{
        type:Array,
        default:[]
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;