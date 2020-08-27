const Role = require('../modules/Role');
const { rolesValidation } = require("../validation/validation")

Index = function (req, res, next) {
    const userLogin = req.user
    const errorMas = req.flash('error');
    const successMas = req.flash('success')[0];

    Role.find({}, (error, roles) => {
        if (error) {
            console.log(error)
        }
        res.render('role/index', { title: process.env.TITLE_DASHBOARD, checkUser: req.isAuthenticated(), userLogin: userLogin, items: roles, successMas: successMas, errorMas: errorMas })
    })
}

addRole = function (req, res, next) {
    const userLogin = req.user
    const errorMas = req.flash('error');

    res.render('role/create', { title: process.env.TITLE_DASHBOARD, checkUser: req.isAuthenticated(), token: req.csrfToken(), userLogin: userLogin, errorMas: errorMas })
}


addRolePost = function (req, res, next) {
    const { error } = rolesValidation(req.body);
    console.log("omar1 " + error)
    if (error) {
        console.log("omar2 " + error)
        req.flash('error', error.details[0].message)
        res.redirect('/roles/new')
    } else {
        const addRole = new Role({
            role: req.body.role,
        });
        console.log("omar123 " + addRole)
        addRole.save((err, role) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(role)
                req.flash('success', 'Roles Add successfully')
                res.redirect('/roles');
            }
        })
    }
}

deleteRole = function (req, res, next) {

    Role.deleteOne({ _id: req.params.id }, (err, doc) => {
        if (err) {
            console.log(err)
        }
        console.log(doc)
        req.flash('success', 'Roles Delete successfully')
        res.redirect('/roles')
    })
}

editRole = function (req, res, next) {

    const errorMas = req.flash('error');

    Role.findOne({ _id: req.params.id }, (err, role) => {
        if (err) {
            console.log(err)
        } else {
            const userLogin = req.user

            res.render('role/edit', { title: process.env.TITLE_DASHBOARD, token: req.csrfToken(), role: role, userLogin: userLogin, errorMas: errorMas })
        }
    })
}

editRolePost = function (req, res, next) {

    const ID = req.body.roleId;
    const { error } = rolesValidation(req.body);
    console.log("omar1 " + error)
    if (error) {
        console.log("omar2 " + error)
        req.flash('error', error.details[0].message)
        res.redirect('/roles/' + ID + '/edit')
    } else {
        const updatedRoles = {
            role: req.body.role,
        };
        Role.findOne({ role: req.body.role, _id: { $ne: ID } }, (err, result) => {
            console.log(err)
            console.log(result)
            if (err) {
                console.log(err)
            }
            if (result) {
                req.flash('error', 'this Roles already exist')
                res.redirect('/roles/' + ID + '/edit');
                return;
            }
            Role.updateOne({ _id: ID }, { $set: updatedRoles }, (err, roles) => {
                if (err) {
                    console.log(err)
                }
                console.log("roles  " + roles);
                req.flash('success', 'Role update successfully')
                res.redirect('/roles');
            })
        })
    }
}

module.exports = {
    Index: Index,
    addRole: addRole,
    addRolePost: addRolePost,
    deleteRole: deleteRole,
    editRole: editRole,
    editRolePost: editRolePost,
}