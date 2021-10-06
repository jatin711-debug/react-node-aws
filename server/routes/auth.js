const express = require('express');
const router = express.Router();
const {userRegisterValidation} = require('../validators/auth');
const {runValidation} = require('../validators/index');


const {register , registerActivate} = require('../controller/controller.js')

router.post('/register', userRegisterValidation, runValidation ,register );
router.post('/register/activate', registerActivate);


module.exports = router;