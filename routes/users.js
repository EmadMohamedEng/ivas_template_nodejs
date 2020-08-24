var express = require('express');
var router = express.Router();
const UsersControl = require('../controller/usersControl');

router.get('/', UsersControl.index)

router.get('/new', UsersControl.addUser)
router.post('/new', UsersControl.addUserPost)


module.exports = router; 