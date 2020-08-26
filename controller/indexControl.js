const User = require('../modules/User');
const bcrypt = require('bcrypt');

Index = function (req, res, next) {
    const userLogin = req.user
    res.render('index', { title: 'Ivas Temp Node', checkUser: req.isAuthenticated(), userLogin: userLogin })

}

profile = function (req, res, next) {
    const userLogin = req.user;
    const successMas = req.flash('success')[0];
    const errorMas = req.flash('error')[0];
    res.render('profile', { title: 'Ivas Temp Node', checkUser: req.isAuthenticated(), userLogin: userLogin, successMas: successMas, errorMas: errorMas })
}

editInfoUser = function (req, res, next) {
    const ID = req.user._id;
    const updatedUser = {
        userName: req.body.userName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
    };
    User.updateOne({ _id: ID }, { $set: updatedUser }, (err, users) => {
        if (err) {
            console.log(err)
        }
        console.log("users  " + users);
        req.flash('success', 'profile update successfully')
        res.redirect('/profile');
    })

}

uploadfile = function (req, res, next) {
    console.log((req.file.path).slice(6));
    const newuser = {
        image: (req.file.path).slice(6)
    }
    User.updateOne({ _id: req.user._id }, { $set: newuser }, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            console.log(doc)
            req.flash('success', 'Image update successfully')
            res.redirect('profile')
        }
    })
}


editpassword = function (req, res, next) {
    const ID = req.user._id;
    User.findOne({ _id: ID }, (error, user) => {

        if (error) {
            console.log(error);
        }
        if (user) {
            console.log("user1 " + user);
            bcrypt.compare(req.body.current_password, user.password, (error, document) => {
                console.log("user2 " + document);

                if (document == false) {
                    console.log("error  " + error)
                    req.flash('error', 'Worng password')
                    res.redirect('/profile')
                }
                if (document) {
                    const updatedPassword = {
                        password: new User().hashpassword(req.body.password)
                    }
                    User.updateOne({ _id: req.user._id }, { $set: updatedPassword }, (err, doc) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("user3 " + doc);
                            req.flash('success', 'Password update successfully')
                            res.redirect('profile')
                        }
                    })
                }
            })
        }
    })
}

module.exports = {
    Index: Index,
    profile: profile,
    editInfoUser: editInfoUser,
    uploadfile: uploadfile,
    editpassword: editpassword,
}