const express = require('express');
const router = express.Router();


const {register} = require('../controller/controller.js')

router.use('/register',register )


module.exports = router;