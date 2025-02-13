const Admin = require('../models/admin');
// const Courses = require('../models/courses');
const argon2 = require('argon2');
// const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const signUp = async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email ||!password){
        return res.json({error:`All fields are required!`});
    }
    const user = await Admin.findOne({email});
    if(user){
        return res.json({error:`User already exist! Please Sign in.`});
    }
    try {
        const hashPassword = await argon2.hash(password);
        const user = new Admin({
            name,
            email,
            password: hashPassword,
            UploadedCourses:[]
        })
        await user.save();
        return res.status(200).json({message:`Sign up successful!`});
    } catch (error) {
        return res.status(500).json({error:`Internal server error!`});
    }
}

const signIn = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.json({error:`Please fill in required fields!`});
    }
    try {
        const user = await Admin.findOne({email});
        if(!user){
            return res.json({error:`User does not exits! Please sign up.`});
        }
        const isMatch = await argon2.verify(user.password, password);
        if(!isMatch){
            return res.json({error:`Invalid Credentials!`});
        }
        
        return res.json({message:`Please verify that its you via email verfication.`});
    } catch (error) {
        return res.json({error:`Internal Server Error!`});
    }
}

const logOut = async(req, res) =>{
    res.clearCookie('sessionId', {
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        path:'/'
    })
    return res.json({message:`Logged out successfully!`});
}

const userInfo = async(req, res) =>{
    const userId = req.userId;
    if(!userId){
        return res.json({message:`Access Denied!`});
    }
    try {
        const user = await Admin.findOne({_id:userId.id});
        if(!user){
            return res.json({message:`Internal Server Error!`});
        }
        return res.json({Name:user.name, Email:user.email});
    } catch (error) {
        return res.json({message:`Internal Server Error!`});
    }
}

module.exports = {signIn, signUp, logOut, userInfo};