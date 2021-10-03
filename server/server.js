const express  = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRouters = require('./routes/auth');
app.use(morgan('dev'));
app.use(bodyParser.json());


app.use(cors({
    origin: '*'
}));

app.use('/api',authRouters);


const port = 8000;
app.listen(port,()=>{
    console.log(`Running on port ${port}`)
})
