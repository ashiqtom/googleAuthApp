const jwt = require("jsonwebtoken");
const userdb = require("../models/user");

const createToken = (user) => {
    const payload = {
        googleId: user.googleId,
        displayName: user.displayName,
        email:user.email
    };
    console.log("lllll",user)

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

module.exports = {
    createToken
};
