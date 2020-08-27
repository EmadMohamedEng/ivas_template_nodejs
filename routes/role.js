var express = require('express');
var router = express.Router();
const isSignin = require("../checklogin/notLogin")
const roleControl = require('../controller/roleControl');
const csrf = require('csurf');
router.use(csrf())
router.get('/', isSignin, roleControl.Index)
router.get('/new', isSignin, roleControl.addRole)
router.post('/', isSignin, roleControl.addRolePost)
router.get('/:id/edit', isSignin, roleControl.editRole)
router.post('/update', isSignin, roleControl.editRolePost)
router.get('/:id/delete', isSignin, roleControl.deleteRole)


module.exports = router; 