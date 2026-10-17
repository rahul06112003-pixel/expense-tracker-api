const mongoose = require('mongoose')
const {Schema} = mongoose


const expenseSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    amount: {
        type: Number,
        required:true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: [
        "Food",
        "Travel",
        "Shopping",
        "Bills",
        "Entertainment",
        "Health",
        "Education",
        "Other"
      ]
    },
    note: {
        type: String,
        trim: true,
        maxlength: 500
    },
    transactionDate: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})


expenseSchema.index({
    user: 1
})


const Expense = mongoose.model("Expense", expenseSchema)

module.exports = Expense
