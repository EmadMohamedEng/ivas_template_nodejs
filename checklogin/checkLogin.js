


module.exports = function isNotSignin(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/')
        return;
    }
    next();
}