var express = require('express');
var router = express.Router();
const IndexControl = require('../controller/indexControl');
const isSignin = require("../checklogin/notLogin")
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toDateString() + req.user._id + file.originalname)
    }

})
const upload = multer({ storage: storage })


router.use(upload.single('myfile'));

router.get('/', isSignin, IndexControl.Index)

router.get('/profile', isSignin, IndexControl.profile)

router.post('/profile', IndexControl.editInfoUser)

router.post('/uploadfile', upload.single('myfile'), IndexControl.uploadfile)

router.post('/password', IndexControl.editpassword)

module.exports = router;