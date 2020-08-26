const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../modules/User');

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id,  (error, user) => {

        if (user) {
            return done(error, user)
        }
        return done(error, user)

    })
})

passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, email, passport, done) => {

    User.findOne({ email: email }, (error, user) => {
        if (error) {
            return done(error)
        }
        if (!user) {
            return done(null, false, req.flash('signinError', 'this user not found'))
        }
        if (!user.comparePassword(passport)) {
            return done(null, false, req.flash('signinError', 'Worng password'))
        }
        return done(null, user)
    })
}))


passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, email, password, done) => {

    User.findOne({ email: email }, (error, user) => {
        if (error) {
            return done(error)
        }
        if (user) {
            return done(null, false, req.flash('signupError', 'this email already exist'))
        }
        const NewUser = new User({
            email: email,
            password: new User().hashpassword(password)
        });
        NewUser.save((error, user) => {
            if (error) {
                return done(error)
            }
            return done(null, user);
        })

    })

}))