const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
const client = require('../config/RedisClient');
const validator = require('validator');
require('dotenv').config({path:'../../.env'});

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateOtp = (length = 6) =>{
    return crypto.randomInt(10 ** (length-1), 10 ** length).toString();
}

const sendOtp = async(email) =>{

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    const otp = generateOtp();
    await client.set(`otp:${email}`, otp, "EX", 300);
    
    const msg = {
        to:email,
        from:process.env.EMAIL_SENDER,
        subject:`Your OTP for Verification`,
        text:`Your OTP code is:${otp}`,
        html: `<h2>Your OTP Code: <strong>${otp}</strong></h2><p>Use this to verify your email.</p>`,
    }

    try {
        await sgMail.send(msg);
        return {sucess:true, message:"OTP sent sucessfully!"};
    } catch (error) {
        console.error("Error sending email:", error.response ? error.response.body : error);
        return { success: false, message: "Failed to send email" };
    }
}

const verifyOtp = async(email, otp)=>{
    const storedOtp = await client.get(`otp:${email}`);
    if(!storedOtp) return {success:false, message:"OTP expired! Please request for another."};
    if(storedOtp !== otp) return {sucess:false, message:"Invalid OTP!"};

    await client.del(`otp:${email}`);
    return {sucess:true, message:"OTP verified sucessfully!"};
}

module.exports = {sendOtp, verifyOtp};