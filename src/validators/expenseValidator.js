const {body} = require("express-validator")


const createExpenseValidator = [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("title is required")
      .isLength({min: 3, max: 100})
      .withMessage("title must be between 3 and 100 character"),

    body("amount")
      .notEmpty()
      .withMessage("amount is required")
      .isFloat({gt: 0})
      .withMessage("amount must be greater than 0"),
      
    body("category")
      .notEmpty()
      .withMessage("category is required")
      .isIn([
        "Food",
        "Travel",
        "Shopping",
        "Bills",
        "Entertainment",
        "Health",
        "Education",
        "Other"
        ])
      .withMessage("Invalid category"), 
    
    body("note")
      .optional()
      .trim()  
      .isLength({max: 500})
      .withMessage("note can be max 500 character"),

    body("transactionDate")
      .optional()
      .isISO8601()
      .withMessage("invalid transaction date"),  
]


const updateExpenseValidator = [
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("title is required")
      .isLength({min: 3, max: 100})
      .withMessage("title must be between 3 and 100 character"),

    body("ammount")
      .optional()
      .notEmpty()
      .withMessage("amount is required")
      .isFloat({gt: 0})
      .withMessage("amount must be greater than 0"),
      
    body("category")
      .optional()
      .notEmpty()
      .withMessage("category is required")
      .isIn([
        "Food",
        "Travel",
        "Shopping",
        "Bills",
        "Entertainment",
        "Health",
        "Education",
        "Other"
        ])
      .withMessage("Invalid category"), 
    
    body("note")
      .optional()
      .trim()  
      .isLength({max: 500})
      .withMessage("note can be max 500 character"),

    body("transactionDate")
      .optional()
      .isISO8601()
      .withMessage("invalid transaction date"), 
]

module.exports = {createExpenseValidator, updateExpenseValidator}