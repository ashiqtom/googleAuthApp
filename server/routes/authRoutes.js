const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');

// Google OAuth login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get("/google/callback", 
    passport.authenticate("google", { 
        session: false, 
        failureRedirect: "http://localhost:5173/login" 
    }), 
    authController.googleAuthCallback
);

module.exports = router;
