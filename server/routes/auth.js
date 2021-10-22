const express = require('express');
const router = express.Router();
const {userRegisterValidation,userLoginValidation,forgotPasswordValidator,resetPasswordValidator} = require('../validators/auth');
const {runValidation} = require('../validators/index');
const {register , registerActivate, login, forgotPassword,resetPassword} = require('../controller/controller')

router.post('/register', userRegisterValidation, runValidation ,register );
router.post('/register/activate', registerActivate);
router.post('/login', userLoginValidation, runValidation ,login );
router.put('/forgot-password', forgotPasswordValidator, runValidation ,forgotPassword);
router.put('/reset-password', resetPasswordValidator, runValidation ,resetPassword);

module.exports = router;