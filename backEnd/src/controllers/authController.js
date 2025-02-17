const {Queue} = require('bullmq');
const client = require('../config/RedisClient');
const {verifyOtp} = require('../services/otpService');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Admin = require('../models/admin');
require('dotenv').config();

const secret = process.env.TOKEN_SECRET;

const otpQueue = new Queue("otp-verification", {connection: client});

const otpRequest = async(req, res) =>{
    const {email} = req.body;
    if(!email) return res.json({sucess: false, message: "Email required!"});
    await otpQueue.add("sendOtp", {email});
    res.json({sucess: true, message: "Request added to the Queue"});
}

const verifyRequest = async(req, res) =>{
    const {email, otp} = req.body;
    if(!email || !otp) return res.json({sucess: false, message: "Email required & OTP required!"});
    const user = await User.findOne({email});
    const response = await verifyOtp(email, otp);
    if(response.sucess === false) return res.json(response);
    const token = jwt.sign({id:user._id}, secret, {expiresIn: '1h'});
            res.cookie('sessionId', token, {
                httpOnly:true,
                secure:false,
                sameSite:"strict",
                maxAge:60 * 60 * 1000,
                path:'/'
            })
    res.json(response);
}

const verifyAdminRequest = async(req, res) =>{
    const {email, otp} = req.body;
    if(!email || !otp) return res.json({sucess: false, message: "Email required & OTP required!"});
    const user = await Admin.findOne({email});
    const response = await verifyOtp(email, otp);
    if(response.sucess === false) return res.json(response);
    const token = jwt.sign({id:user._id}, secret, {expiresIn: '1h'});
            res.cookie('sessionId', token, {
                httpOnly:true,
                secure:false,
                sameSite:"strict",
                maxAge:60 * 60 * 1000,
                path:'/'
            })
    res.json(response);
}

module.exports = {otpRequest, verifyRequest, verifyAdminRequest};