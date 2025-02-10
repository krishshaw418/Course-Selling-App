const express = require('express');
const {signUp, signIn, logOut, userInfo, sendOTP, verifyOTP} = require('../controllers/userController');
const { Auth } = require('../middlewares/auth');
const router = express.Router();

//<------- User Routes -------->
router.post(`/signUp`, signUp);
router.post(`/signIn`, signIn);
router.post(`/logOut`, logOut);
router.get(`/userInfo`, Auth, userInfo);
router.post(`/send-otp`, sendOTP);
router.post(`/verify-otp`, verifyOTP);

module.exports = router;