const User = require('../modules/User');
const passport = require('passport');
const { registerValidation, LoginValidation } = require("../../validation/validation")


index = function (req, res, next) {

    User.find({}, (error, users) => {
        if (error) {
            console.log(error)
        }
        res.render('users/index', { title: 'Ivas Temp', items: users })

    })


}

addUser = function (req, res, next) {
    res.render('users/create', { title: 'Ivas Temp' })
}


addUserPost = function (req, res, next) {

    const { error } = registerValidation(req.body);

    if (error) {
        // res.status(404).json({
        //     Massage: error.details[0].message
        // })
        console.log(error)
    } else {
        const user = new User({
            email: req.body.email,
            userName: req.body.userName,
            password: new User().hashpassword(req.body.password)
        });

        User.findOne({ email: req.body.email }, (err, result) => {
            if (err) {
                res.status(404).json({
                    Massage: err
                })
            }
            if (result) {
                console.log('this email already exist')
                res.status(404).json({
                    Massage: 'this email already exist'
                })
                return;
            }
            user.save().
                then(result => {
                    res.status(200).json({
                        User: result
                    })
                })
                .catch(err => {
                    res.status(404).json({
                        Massage: err
                    })
                })
        })
    }




}







module.exports = {
    index: index,
    addUser: addUser,
    addUserPost: addUserPost,
}