const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const config = require("../config/env")



const registerUser = async (req, res, next) => {
    try {
     const userExits = await User.findOne({emailId: req.body.emailId})
    
    if(userExits){
        return res.status(400).json({
            message: "user already exits"
        })
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = hashPassword

    const user = await User.create(req.body)

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.emailId
      },
      config.jwtSecret,
      {expiresIn: "7d"}
    )

    res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(200).json({
          message: "register successfully",
    });
    } catch (error) {
        next(error)
    }
}



const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({emailId: req.body.emailId})
        if(!user){
            return res.status(400).json({
                message: "invalid credential"
            })
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password)
         if(!isMatch){
          return res.status(400).json({
          message: "Invalid credentials"
          });
        }
        const token = jwt.sign(
         { userId: user._id,
           email: user.emailId
         },
          config.jwtSecret,  
         { expiresIn: "7d" }
        )
 
            
        res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        res.status(200).json({
          message: "Login successfully",
        });
    } catch (error) {
        next(error)
    }
}


module.exports = {registerUser, loginUser}