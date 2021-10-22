const express = require('express');
const expressJwt = require('express-jwt');
const router = express.Router();
const { authMiddleware,adminMiddleware } = require('../controller/controller');
const { read } = require('../controller/user');



router.get('/user', expressJwt({secret : process.env.JWT_SECRET,algorithms:['HS256']}),authMiddleware, read);
router.get('/admin', expressJwt({secret : process.env.JWT_SECRET,algorithms:['HS256']}) ,adminMiddleware, read);

module.exports = router;