const {check} = require('express-validator');

exports.linkCreateValidator = [
    check('title')
        .not()
            .isEmpty()      
                .withMessage('Title is required'),
    check('url')
        .not()
            .isEmpty()      
                .withMessage('Url Is Required'),
    check('categories')
        .not()
            .isEmpty()      
                .withMessage('Category Is Required'),
    check('type')
        .not()
            .isEmpty()      
                .withMessage('Type Is Required'),
    check('medium')
        .not()
            .isEmpty()      
                .withMessage('Medium Is Required'),
];


exports.linkUpdateValidator = [
    check('title')
        .not()
            .isEmpty()      
                .withMessage('Title is required'),
    check('url')
        .not()
            .isEmpty()      
                .withMessage('Url Is Required'),
    check('categories')
        .not()
            .isEmpty()      
                .withMessage('Category Is Required'),
    check('type')
        .not()
            .isEmpty()      
                .withMessage('Type Is Required'),
    check('medium')
        .not()
            .isEmpty()      
                .withMessage('Medium Is Required'),
];