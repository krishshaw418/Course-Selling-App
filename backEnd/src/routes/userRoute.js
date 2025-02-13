const express = require('express');
const {signUp, signIn, logOut, userInfo} = require('../controllers/userController');
const {otpRequest, verifyRequest} = require('../controllers/authController');
const { Auth } = require('../middlewares/auth');
const router = express.Router();

//<------- User Routes -------->
router.post(`/signUp`, signUp);
router.post(`/signIn`, signIn);
router.post(`/logOut`, logOut);
router.get(`/userInfo`, Auth, userInfo);
router.post(`/send-otp`, otpRequest);
router.post(`/verify-otp`, verifyRequest);

module.exports = router;