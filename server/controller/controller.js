const {registerEmailParams,forgotPasswordEmailParams} = require('../helpers/email');
const User = require('../models/user');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const shortId = require('shortId');
const _ = require('lodash');
require('dotenv').config()
const AWS = require('aws-sdk');

AWS.config.update({
    region:'us-east-2',
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

exports.requireSignin = expressJwt({secret : process.env.JWT_SECRET,algorithms:['HS256']});

exports.authMiddleware = (req, res, next) => {
    console.log("Inside authMiddleware")
    const authUserId = req.user._id;
    User.findOne({_id: authUserId}).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error:"User Not Found"
            });
        }
        req.profile = user;
        next();
    });
};

exports.adminMiddleware = (req, res, next) => {
    console.log("Inside adminMiddleware");
    const adminUserId = req.user._id;
    User.findOne({_id: adminUserId}).exec((err, user) => {
        if(err || !user) {
            console.log("Inside adminMiddleware finding admin user");
            return res.status(400).json({
                error:"User Not Found"
            });
        }

        if(user.role !== 'admin') {
            return res.status(400).json({
                error:"Admin Resource . Access Denied"
            });
        }
        req.profile = user;
        next();
    });
}; 

exports.forgotPassword = (req, res) => {
    const { email } = req.body;
    // check if user exists with that email
    User.findOne({ email }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist'
            });
        }
        // generate token and email to user
        const token = jwt.sign({ name: user.name }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' });
        // send email
        const params = forgotPasswordEmailParams(email, token);

        // populate the db > user > resetPasswordLink
        return user.updateOne({ resetPasswordLink: token }, (err, success) => {
            if (err) {
                return res.status(400).json({
                    error: 'Password reset failed. Try later.'
                });
            }
            const sendEmail = ses.sendEmail(params).promise();
            sendEmail
                .then(data => {
                    console.log('ses reset pw success', data);
                    return res.json({
                        message: `Email has been sent to ${email}. Click on the link to reset your password`
                    });
                })
                .catch(error => {
                    console.log('ses reset pw failed', error);
                    return res.json({
                        message: `We could not vefiry your email. Try later.`
                    });
                });
        });
    });
};

exports.resetPassword = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;
    if (resetPasswordLink) {
        // check for expiry
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, (err, success) => {
            if (err) {
                return res.status(400).json({
                    error: 'Expired Link. Try again.'
                });
            }
            
            User.findOne({ resetPasswordLink }).exec((err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: 'Invalid token. Try again'
                    });
                }

                const updatedFields = {
                    password: newPassword,
                    resetPasswordLink: ''
                };

                user = _.extend(user, updatedFields);

                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: 'Password reset failed. Try again'
                        });
                    }

                    res.json({
                        message: `Great! Now you can login with your new password`
                    });
                });
            });
        });
    }
};