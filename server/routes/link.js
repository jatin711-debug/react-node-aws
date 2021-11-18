const express = require('express');
const router = express.Router();

const {
    linkCreateValidator,
    linkUpdateValidator
} = require('../validators/link');

const {
    requireSignin,
    authMiddleware
} = require('../controller/controller');

const{
    create,
    list,
    read,
    update,
    remove,
} = require('../controller/link');

const {runValidation} = require('../validators/index');

//routes

router.post('/link',linkCreateValidator, runValidation, requireSignin, authMiddleware, create);
router.get('/links',list);
router.get('link/:slug',read);
router.put('link/:slug',linkUpdateValidator,runValidation,requireSignin,authMiddleware,update);
router.delete('link/:slug',requireSignin,authMiddleware,remove);

module.exports = router;