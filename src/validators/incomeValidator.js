
const { body } = require("express-validator");

const incomeCategories = [
  "Salary",
  "Freelancing",
  "Business",
  "Investment Returns",
  "Other"
];

const createIncomeValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("category")
    .notEmpty()
    .withMessage("Category is required")
    .bail()
    .isIn(incomeCategories)
    .withMessage("Invalid income category"),

  body("note")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Note can be at most 500 characters"),

  body("transactionDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid transaction date")
];

const updateIncomeValidator = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("amount")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("category")
    .optional()
    .isIn(incomeCategories)
    .withMessage("Invalid income category"),

  body("note")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Note can be at most 500 characters"),

  body("transactionDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid transaction date")
];

module.exports = {
  createIncomeValidator,
  updateIncomeValidator
};
