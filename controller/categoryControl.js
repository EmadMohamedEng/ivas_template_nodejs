const Category = require('../modules/Category');
const { categoryValidation } = require("../validation/validation")


Index = function (req, res, next) {
    const userLogin = req.user
    const errorMas = req.flash('error');
    const successMas = req.flash('success')[0];
    res.render('category/index', { title: process.env.TITLE_DASHBOARD, checkUser: req.isAuthenticated(), userLogin: userLogin, errorMas: errorMas, successMas: successMas })
}

create = function (req, res, next) {
    const userLogin = req.user
    const errorMas = req.flash('error');
    res.render('category/create', { title: process.env.TITLE_DASHBOARD, checkUser: req.isAuthenticated(), userLogin: userLogin, errorMas: errorMas })
}

createPost = function (req, res, next) {
    var title = req.body.name;
    console.log(req.file.path)
    //console.log("test " + upload.single('myfile'))
    console.log(req.body)
return;
    const { error } = categoryValidation(req.body);
    console.log("omar1 " + error)
    if (error) {
        console.log("omar2 " + error)
        req.flash('error', error.details[0].message)
        res.redirect('/category/create')
    } else {
        const category = new Category({
            name: req.body.name,
            image: (req.file.path).slice(6)
        });
        category.save((err, category) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log(category)
                req.flash('success', 'Category Add successfully')
                res.redirect('/category');
            }
        })
    }
}
module.exports = {
    Index: Index,
    create: create,
    createPost: createPost,
}