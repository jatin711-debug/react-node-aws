const {registerEmailParams} = require('../helpers/email');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const AWS = require('aws-sdk');

AWS.config.update({
    region:'us-west-2',
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
    
});

const ses = new AWS.SES({apiVersion:'2010-12-01'});
exports.register = (req, res) => {
    
    const {name,email,password} = req.body;
    User.findOne({email:email}).exec(function (err, user) {
        if(user) {
            return res.status(422).json({error:'Email Already Exist'});
        }
        const token = jwt.sign({name,email,password},process.env.JWT_ACCOUNT_ACTIVATION,{expiresIn:'10m'});
        const params = registerEmailParams(email,token);
        const sendEmailOnRegister = ses.sendEmail(params).promise()
        sendEmailOnRegister.then(data =>{
            console.log('Email SUbmitted TO SES'+data);
            res.json({message:`Email Has Been Sent To ${email}`});
        }).catch(err => {
            console.log(err);
            res.json('We Could not send email, Error Occured');
        });
    });
};