const jwt = require("jsonwebtoken");
const User=require('../models/user')

const profile=async(req,res)=>{
    try{
        const userDetails=await User.findById(req.user._id)
        
        res.status(200).json(userDetails);
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }

}
const logout=(req, res) => {
    res.status(200).json({ message: "Logout successful" });
}

module.exports = {
    logout,
    profile
};
