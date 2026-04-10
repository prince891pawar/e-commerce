const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

async function registerUser(req, res) {
    
    const { username, email, password} = req.body;
    if (!username || !email || !password){
        return res.status(400).json({
            message: "please fill all the fields"
        })
    }
    const ifUserAlreadyExists = await User.findOne({
        email: email,
        password: password
    })
    if(ifUserAlreadyExists){
        return res.status(400).json({
            message: "user already exists"
        })
    }
   const hash = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        email, 
        password: hash
    })
    await user.save();
    const token = jwt.sign({ id: user._id}, process.env.SCRETE_KEY, 
        {expiresIn: "3d"}
    )
    res.status(201).json({
        message: "user created successfully",
        token
    })
}

async function loginUser(req, res){
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            message: "please fill all the fields"
        })
    }
    // Example using bcrypt

    const user = await User.findOne({
        email: email            
    })
    if(!user){
        return res.status(400).json({
            message: "invalid credentials"
        })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({
            message: "invalid credentials"
        })
    }
    const token = jwt.sign({id: user._id}, process.env.SCRETE_KEY, {
        expiresIn: "3d"
    })
    res.cookie("token", token)
    res.status(200).json({
        message: "login successful",
        token
    })
}

async function LogoutUser(req, res){
    res.clearCookie("token")
    res.status(200).json({
        message: "logout successful"
    })
}

module.exports = {
    registerUser,
    loginUser,
    LogoutUser
}


