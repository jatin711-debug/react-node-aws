const authRouters = require('./routes/auth');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express  = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json()); //currently depreceated
mongoose.connect(process.env.MONGO_DB_CLOUD,{useNewUrlParser:true, useUnifiedTopology:true}).then( () => console.log('Connect to DB')).catch( (err) => console.log('Error'+err));
app.use(cors({
    origin: '*'
}));

app.use('/api',authRouters);

const port = 8000;
app.listen(port,()=>{
    console.log(`Running on port ${port}`)
});
