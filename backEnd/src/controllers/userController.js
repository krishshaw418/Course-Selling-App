const User = require('../models/user');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {sendOtp, verifyOtp} = require('../services/otpService');
dotenv.config();
const secret = process.env.TOKEN_SECRET;

const signUp = async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email ||!password){
        return res.json({error:`All fields are required!`});
    }
    const user = await User.findOne({email});
    if(user){
        return res.json({error:`User already exist! Please Sign in.`});
    }
    try {
        const hashPassword = await argon2.hash(password);
        const user = new User({
            name,
            email,
            password: hashPassword,
            purchasedCoursesId:[]
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
        const user = await User.findOne({email});
        if(!user){
            return res.json({error:`User does not exits! Please sign up.`});
        }
        const isMatch = await argon2.verify(user.password, password);
        if(!isMatch){
            return res.json({error:`Invalid Credentials!`});
        }
        const token = jwt.sign({id:user._id}, secret, {expiresIn: '1h'});
        
        res.cookie('sessionId', token, {
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:60 * 60 * 1000,
            path:'/'
        })
        return res.json({message:`Sign in successful!`});
    } catch (error) {
        return res.json({error:`Internal Server Error!`});
    }
}

const sendOTP = async(req, res) =>{
    const {email} = req.body;
    if(!email) return res.json({message:"Email Required!"});
    const response = await sendOtp(email);
    res.json(response);
}

const verifyOTP = async(req, res) =>{
    const {email, otp} = req.body;
    if(!email || !otp) return res.json({message:"Please enter email and OTP"});
    const response = await verifyOtp(email, otp);
    res.json(response);
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
        const user = await User.findOne({_id:userId.id});
        if(!user){
            return res.json({message:`Internal Server Error!`});
        }
        return res.json({Name:user.name, Email:user.email});
    } catch (error) {
        return res.json({message:`Internal Server Error!`});
    }
}

module.exports = {signUp, signIn, logOut, userInfo, sendOTP, verifyOTP};