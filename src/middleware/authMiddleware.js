const jwt = require("jsonwebtoken")
const User = require("../models/user")
const config = require("../config/env")



const auth = async (req, res, next) => {
   try {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message: "login first"
        })      
    }

    const payload = jwt.verify(token, config.jwtSecret)

    const user = await User.findById(payload.userId)

    req.user = user

    next()

   } catch (error) {
      next(error)
   }
}


module.exports = auth