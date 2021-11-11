const express = require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require("../controller/home_controller")

router.get('/',homeController.home);
router.get('/main',passport.checkAuthentication, homeController.main);
router.use('/users', require('./users'));

module.exports = router;