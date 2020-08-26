var express = require('express');
var router = express.Router();
const UsersControl = require('../controller/usersControl');
const csrf = require('csurf');
const isSignin = require("../checklogin/notLogin")
router.use(csrf())


router.get('/list', isSignin, UsersControl.index) /* show List users */
router.get('/new', isSignin, UsersControl.addUser) /* page add user get */
router.post('/', isSignin, UsersControl.addUserPost) /* methods form add user post */
router.get('/:id/edit', isSignin, UsersControl.editUser) /* page update user get */
router.post('/update', isSignin, UsersControl.editUserPost) /* methods form update user post */
router.get('/:id/delete', isSignin, UsersControl.deleteUser) /* delete user */


module.exports = router; 