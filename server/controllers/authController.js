const jwt = require("jsonwebtoken");
const authService = require("../services/authService");
const User=require('../models/user')

const googleAuthCallback = async (req, res) => {
    const user = req.user; // user object from passport
    const token = authService.createToken(user);

    // Redirect to frontend with token in URL
    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
};

module.exports = {
    googleAuthCallback
};
