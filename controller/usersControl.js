const User = require('../modules/User');
const passport = require('passport');
const { registerValidation } = require("../validation/validation")





index = function (req, res, next) {
    const successMas = req.flash('success')[0];
    const errorMas = req.flash('error');
    const userLogin = req.user
    User.find({}, (error, users) => {
        if (error) {
            console.log(error)
        }
        res.render('users/index', { title: 'Ivas Temp', items: users, successMas: successMas, errorMas: errorMas, userLogin: userLogin })
    })


}

addUser = function (req, res, next) {
    const userLogin = req.user

    res.render('users/create', { title: 'Ivas Temp', token: req.csrfToken(), userLogin: userLogin })
}

addUserPost = function (req, res, next) {

    const user = new User({
        email: req.body.email,
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
        password: new User().hashpassword(req.body.password)
    });

    User.findOne({ email: req.body.email }, (err, result) => {
        if (err) {
            res.status(404).json({
                Massage: err
            })
        }
        if (result) {
            req.flash('error', 'this email already exist')
            res.redirect('/users/list');
            return;
        }

        user.save((err, user) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(user)
                req.flash('success', 'User Add successfully')
                res.redirect('/users/list');
            }
        })
    })




}

editUser = function (req, res, next) {

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            const userLogin = req.user

            res.render('users/edit', { title: 'Ivas Temp', token: req.csrfToken(), user: user, userLogin: userLogin })
        }
    })
}

editUserPost = function (req, res, next) {
    const ID = req.body.userId;
    const updatedUser = {
        userName: req.body.userName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: new User().hashpassword(req.body.password)
    };
    User.updateOne({ _id: ID }, { $set: updatedUser }, (err, users) => {
        if (err) {
            console.log(err)
        }
        console.log("users  " + users);
        req.flash('success', 'User update successfully')
        res.redirect('/users/list');
    })


}

deleteUser = function (req, res, next) {

    User.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (err) {
            console.log(err)
        }
        console.log(doc)
        res.redirect('/users/list')
    })
}








module.exports = {
    index: index,
    addUser: addUser,
    addUserPost: addUserPost,
    editUser: editUser,
    editUserPost: editUserPost,
    deleteUser: deleteUser,
}