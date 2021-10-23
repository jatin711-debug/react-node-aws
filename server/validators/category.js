const {check}  = require('express-validator');

exports.categoryCreateValidator = [
    check('name')
        .not()
            .isEmpty()      
                .withMessage('Name is required'),
    check('image')
            .isEmpty()      
                .withMessage('Image Is Required'),
    check('content')
        .isLength({min:20})   
                .withMessage('Content Is Required')
]

exports.categoryUpdateValidator = [
    check('name')
        .not()
            .isEmpty()      
                .withMessage('Name is required'),
    check('content')
        .isLength({min:20})   
                .withMessage('Content Is Required')
]

