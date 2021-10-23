const {check}  = require('express-validator');

exports.userRegisterValidation = [
    check('name')
        .not()
            .isEmpty()      
                .withMessage('Name is required'),
    check('email')
            .isEmail()      
                .withMessage('Must be a valid email address'),
    check('password')
        .isLength({min:6})   
                .withMessage('Password Must Be 8 Character Long')
]

exports.userLoginValidation = [
    check('email')
            .isEmail()      
                .withMessage('Must be a valid email address'),
    check('password')
        .isLength({min:6})   
                .withMessage('Password Must Be 6 Character Long')

]

exports.forgotPasswordValidator = [
    check('email')
            .isEmail()      
                .withMessage('Must be a valid email address')
]

exports.resetPasswordValidator = [
    check('newPassword')
        .isLength({min:6})   
                .withMessage('Password Must Be 6 Character Long'),
    check('resetPasswordLink')
        .not()
            .isEmpty()      
                .withMessage('Token Is Required')
]