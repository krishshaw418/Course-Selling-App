const {Queue} = require('bullmq');
const client = require('../config/RedisClient');
const {verifyOtp} = require('../services/otpService');

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
    const response = await verifyOtp(email, otp);
    res.json(response);
}

module.exports = {otpRequest, verifyRequest};