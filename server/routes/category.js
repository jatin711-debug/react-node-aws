const express = require('express');
const router = express.Router();

const {
    categoryCreateValidator,
    categoryUpdateValidator
} = require('../validators/category');

const {
    requireSignin,
    adminMiddleware
} = require('../controller/controller');

const{
    create,
    list,
    read,
    update,
    remove,
} = require('../controller/category');

const {runValidation} = require('../validators/index');

//routes

router.post('/category',categoryCreateValidator,runValidation,requireSignin,adminMiddleware,create);
router.get('/categories',list);
router.get('/category/:slug',read);
router.put('/category/:slug',categoryUpdateValidator,runValidation,requireSignin,adminMiddleware,update);
router.delete('/category/:slug',requireSignin,adminMiddleware,remove);

module.exports = router;