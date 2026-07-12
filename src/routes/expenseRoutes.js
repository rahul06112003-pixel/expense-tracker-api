const express = require("express")
const expenseRouter = express.Router()
const {createExpenseValidator, updateExpenseValidator} = require("../validators/expenseValidator")
const validate = require("../middleware/validationMiddleware")
const auth = require("../middleware/authMiddleware")
const {createExpense, readAllExpense, readOneExpense, updateExpense, deleteExpense} = require("../controller/expenseController")
const allowFields = require("../middleware/allowField")




expenseRouter.use(auth)


expenseRouter.post('/', createExpenseValidator, validate, createExpense)
expenseRouter.get('/', readAllExpense)
expenseRouter.get('/:id', readOneExpense)
expenseRouter.patch( '/:id',
    updateExpenseValidator,
    validate,
    allowFields([
        "title",
        "amount",
        "category",
        "note",
        "transactionDate"
    ]),
    updateExpense
)
expenseRouter.delete('/:id', deleteExpense)



module.exports = expenseRouter