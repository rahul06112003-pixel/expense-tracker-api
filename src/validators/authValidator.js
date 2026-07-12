const { body } = require("express-validator")


const registerValidator = [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("name is required")
      .isLength({min:3, max:50})
      .withMessage("name must be between 3 and 50 character"),

    body("emailId")
      .trim()
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("provide valid email")
      .normalizeEmail(),

    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isStrongPassword()
      .withMessage("password length must be 8 character, 1 uppercase letter, 1 lowercase letter, one number and one special character"),
         
]


const loginValidator = [
  body("emailId")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("provide valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("password is required")  
]


module.exports = {
    registerValidator, loginValidator
}