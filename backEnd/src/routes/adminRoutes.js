const express = require('express');
const {signUp, signIn, logOut, userInfo} = require('../controllers/adminController');
const {otpRequest, verifyRequest} = require('../controllers/authController');
const { Auth } = require('../middlewares/auth');
const router = express.Router();

//<------- Admin Routes -------->
router.post(`/signUp`, signUp);
router.post(`/signIn`, signIn);
router.post(`/send-otp`, otpRequest);
router.post(`/verify-otp`, verifyRequest);
router.post(`/logOut`, logOut);
router.get(`/userInfo`, Auth, userInfo);

module.exports = router;