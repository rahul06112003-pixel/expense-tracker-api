
const mongoose = require("mongoose");
const { Schema } = mongoose;

const incomeSchema = new Schema({
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
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Salary",
      "Freelancing",
      "Business",
      "Investment",
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
}, { timestamps: true });

incomeSchema.index({
  user: 1
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
