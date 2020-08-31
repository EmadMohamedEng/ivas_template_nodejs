var express = require('express');
var router = express.Router();
const categoryControl = require('../controller/categoryControl');
const isSignin = require("../checklogin/notLogin")

//const csrf = require('csurf');


router.get('/', isSignin, categoryControl.Index)
router.get('/create', isSignin, categoryControl.create)
router.post('/', isSignin,categoryControl.createPost)



module.exports = router;