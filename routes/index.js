var express = require('express');
var router = express.Router();
const IndexControl = require('../controller/indexControl');

router.get('/', IndexControl.Index)

module.exports = router; 