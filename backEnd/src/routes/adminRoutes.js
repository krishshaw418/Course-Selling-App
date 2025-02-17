const express = require('express');
const {signUp, signIn, logOut, userInfo, uploadCourse} = require('../controllers/adminController');
const {otpRequest, verifyAdminRequest} = require('../controllers/authController');
const { Auth } = require('../middlewares/auth');
const router = express.Router();

//<------- Admin Routes -------->
router.post(`/signUp`, signUp);
router.post(`/signIn`, signIn);
router.post(`/send-otp`, otpRequest);
router.post(`/verify-otp`, verifyAdminRequest);
router.post(`/logOut`, logOut);
router.get(`/userInfo`, Auth, userInfo);
router.post(`/upload`, Auth, uploadCourse);

module.exports = router;