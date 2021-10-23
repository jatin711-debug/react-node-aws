const express = require('express');
const expressJwt = require('express-jwt');
const router = express.Router();
const { authMiddleware,adminMiddleware } = require('../controller/controller');
const { read } = require('../controller/user');
const {requireSignin} = require('../controller/controller')


router.get('/user',requireSignin,authMiddleware, read);
router.get('/admin', requireSignin,adminMiddleware, read);

module.exports = router;