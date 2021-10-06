const {registerEmailParams} = require('../helpers/email');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const shortId = require('shortId');

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
        const sendEmailOnRegister = ses.sendEmail(params).promise();
        sendEmailOnRegister.then(data =>{
            console.log('Email SUbmitted TO SES'+data);
            res.json({message:`Email Has Been Sent To ${email}`});
        }).catch(err => {
            console.log(err);
            res.json({message:'We Could not send email, Error Occured'});
        });
    });
};

exports.registerActivate = (req, res) => {
        const {token} = req.body;
        jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION, (err, result) => {
            if(err) {
                return res.status(401).json({
                error:"Expired Link Try Again"
                    });
                }
        const {name,email,password} = jwt.decode(token);
        const username = shortId.generate();
        User.findOne({email}).exec((err, user) => {
            if(user){
                return res.status(401).json({error:"Email is Taken"});
            }
            const newUser = new User({username,name,email,password});
            newUser.save(function(err, user){
                if(err){
                    return res.status(401).json({error:"Error Saving User in Database, Try Again"});
                }
                return res.json({message:"Registeration Success, Please Login"});
            });
        });
    });
}



exports.login = (req, res) => {
    const {email,password} = req.body;
    User.findOne({email}).exec(function (err, user) {
        if(err || !user){
            return res.status(404).send({error:"User With This Email Does Not Exist ...Please Register First!!!"});
        }
        if(!user.authenticate(password)){
            return res.status(404).send({error:"Email and Password Does not Match"});
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        const {_id,name,email,role} = user;

        return res.json({
            token,user:{
                _id,name,email,role
            }
        })
    });
};