
Index = function (req, res, next) {

    res.render('index', { title: 'Ivas Temp Node' })

}

module.exports = {
    Index: Index,
}