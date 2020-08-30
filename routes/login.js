var express = require('express');
var router = express.Router();
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const isNotSignin = require("../checklogin/checkLogin")
const isSignin = require("../checklogin/notLogin")
const csrf = require('csurf');

router.use(csrf())

router.get('/', isNotSignin, function (req, res, next) {
    var massagesError = req.flash('signinError')
    totalProduct = 0;
    res.render('login/login', { title: process.env.TITLE_DASHBOARD, layout: 'layoutLogin.hbs', massages: massagesError, token: req.csrfToken() });
});

router.post('/', [
    check('email').not().isEmpty().withMessage('Please enter you email'),
    check('email').isEmail().withMessage('Please enter vaild email'),
    check('password').not().isEmpty().withMessage('Please enter you password'),
    check('password').isLength({ min: 5 }).withMessage('Please enter password more than 5 char'),
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        /* console.log(errors) */

        var validationMassage = [];
        for (var i = 0; i < errors.errors.length; i++) {
            validationMassage.push(errors.errors[i].msg)
        }

        req.flash('signinError', validationMassage);
        res.redirect('/login');
        return;
    }

    next();
}, passport.authenticate('local-signin', {

    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}))

router.get('/logout', isSignin, (req, res, next) => {
    req.logOut();
    res.redirect('/login')

})

module.exports = router; 