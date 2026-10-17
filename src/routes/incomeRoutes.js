const express = require("express");
const incomeRouter = express.Router();
const auth = require("../middleware/authMiddleware");
const { createIncome, getIncome, updateIncome, deleteIncome } = require("../controller/incomeController");
const {
  createIncomeValidator,
  updateIncomeValidator
} = require("../validators/incomeValidator");
const validate = require("../middleware/validationMiddleware");
const allowFields = require("../middleware/allowField")


incomeRouter.use(auth);


incomeRouter.post("/", createIncomeValidator, validate, createIncome);

incomeRouter.get("/", getIncome);

incomeRouter.patch(
  "/:id",
  updateIncomeValidator,
  validate,
  allowFields([
    "title",
    "amount",
    "category",
    "note",
    "transactionDate"
  ]),
  updateIncome
);

incomeRouter.delete("/:id", deleteIncome);


module.exports = incomeRouter;