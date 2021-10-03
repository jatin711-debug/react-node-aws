const express  = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const authRouters = require('./routes/auth');


app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cors())
app.use('/api',authRouters);

const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`Running on port ${port}`)
})
