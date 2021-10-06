const express = require('express');
const router = express.Router();
const {userRegisterValidation,userLoginValidation} = require('../validators/auth');
const {runValidation} = require('../validators/index');


const {register , registerActivate, login} = require('../controller/controller.js')

router.post('/register', userRegisterValidation, runValidation ,register );
router.post('/register/activate', registerActivate);
router.post('/login', userLoginValidation, runValidation ,login );

module.exports = router;