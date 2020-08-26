


module.exports = function isSignin(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/login/login')
        return;
    }
    next();
}