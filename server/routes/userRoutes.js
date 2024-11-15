const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userAuthentication=require('../middleware/auth');

router.get('/profile', userAuthentication.authenticate ,userController.profile);// route with auth
router.get("/logout",userAuthentication.authenticate, userController.logout);



module.exports = router;
