const express  = require('express');
const app = express();
const authRouters = require('./routes/auth');


app.use('/api',authRouters);

const port = 8080;
app.listen(port,()=>{
    console.log(`Running on port ${port}`)
})
