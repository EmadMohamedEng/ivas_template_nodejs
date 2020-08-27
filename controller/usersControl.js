const User = require('../modules/User');
const Role = require('../modules/Role');
const passport = require('passport');
const { addUsersValidation } = require("../validation/validation")

index = function (req, res, next) {
    const successMas = req.flash('success')[0];
    const errorMas = req.flash('error');
    const userLogin = req.user
    User.find({}, (error, users) => {
        if (error) {
            console.log(error)
        }
        // console.log(users)
        // return;
        res.render('users/index', { title: process.env.TITLE_DASHBOARD, items: users, successMas: successMas, errorMas: errorMas, userLogin: userLogin })
    })


}

addUser = function (req, res, next) {
    const userLogin = req.user;
    const errorMas = req.flash('error');
    Role.find({}, (error, roles) => {
        if (error) {
            console.log(error)
        }
        res.render('users/create', { title: process.env.TITLE_DASHBOARD, token: req.csrfToken(), userLogin: userLogin, errorMas: errorMas, roles: roles })
    })
}

addUserPost = function (req, res, next) {

    const { error } = addUsersValidation(req.body);
    console.log("omar1 " + error)
    if (error) {
        console.log("omar2 " + error)
        req.flash('error', error.details[0].message)
        res.redirect('/users/new')
    } else {
        const user = new User({
            email: req.body.email,
            userName: req.body.userName,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role,
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
}

editUser = function (req, res, next) {
    const errorMas = req.flash('error');

    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            console.log(err)
        } else {
            Role.find({}, (error, roles) => { 
                if (error) {
                    console.log(error)
                } 
                const userLogin = req.user
                res.render('users/edit', { title: process.env.TITLE_DASHBOARD, token: req.csrfToken(), user: user, userLogin: userLogin, errorMas: errorMas ,roles:roles})
            })
        }
    })

}

editUserPost = function (req, res, next) {
    const ID = req.body.userId;
    const { error } = addUsersValidation(req.body);
    console.log("omar1 " + error)
    if (error) {
        console.log("omar2 " + error)
        req.flash('error', error.details[0].message)
        res.redirect('/users/' + ID + '/edit')
    } else {
        const updatedUser = {
            userName: req.body.userName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            role: req.body.role,
            password: new User().hashpassword(req.body.password)
        };
        User.findOne({ email: req.body.email, _id: { $ne: ID } }, (err, result) => {
            console.log(err)
            console.log(result)
            if (err) {
                console.log(err)
            }
            if (result) {
                req.flash('error', 'this email already exist')
                res.redirect('/users/' + ID + '/edit');
                return;
            }
            User.updateOne({ _id: ID }, { $set: updatedUser }, (err, users) => {
                if (err) {
                    console.log(err)
                }
                console.log("users  " + users);
                req.flash('success', 'User update successfully')
                res.redirect('/users/list');
            })
        })
    }
}

deleteUser = function (req, res, next) {

    User.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (err) {
            console.log(err)
        }
        console.log(doc)
        req.flash('success', 'Users Delete successfully')
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