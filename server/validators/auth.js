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
        .isLength({min:8})   
                .withMessage('Password Must Be 8 Character Long')

]