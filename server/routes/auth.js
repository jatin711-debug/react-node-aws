const express = require('express');
const router = express.Router();
const {userRegisterValidation} = require('../validators/auth');
const {runValidation} = require('../validators/index');


const {register} = require('../controller/controller.js')

router.use('/register', userRegisterValidation, runValidation ,register );


module.exports = router;