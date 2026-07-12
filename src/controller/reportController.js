const Expense = require("../models/expense")



const getCategoryReport = async (req, res, next) => {
    try {
        const report = await Expense.aggregate([
            {
                $match: {
                    user: req.user._id
                }
            },
            {
                $group: {
                    _id: "$category",
                    totalExpense: {
                        $sum: "$amount"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    totalExpense: 1
                }
            },
            {
                $sort: {
                    totalExpense: -1
                }
            }
        ])

        res.status(200).json({
            sucess: true,
            report
        })
    } catch (error) {
        next(error)
    }
}



const getMonthlyReport = async (req, res, next) => {
    try {
        const report = await Expense.aggregate([
            {
                $match: {
                    user: req.user._id
                }
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: "$transactionDate"
                        },
                        month: {
                            $month: "$transactionDate"
                        }
                    },
                    totalExpense: {
                        $sum: "$amount"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    totalExpense: 1
                }
            },
            {
                $sort: {
                    year: 1,
                    month: 1
                }
            }
        ])

        res.status(200).json({
            sucess: true,
            report
        })
    } catch (error) {
        next(error)
    }
}


const getStatisticsReport = async (req, res, next) => {
    try {
        const report = await Expense.aggregate([
            {
                $match: {
                    user: req.user._id
                }
            },
            {
                $group: {
                    _id: null,
                    totalExpense: {
                        $sum: "$amount"
                    },
                    averageExpense: {
                        $avg: "$amount"
                    },
                    highestExpense: {
                        $max: "$amount"
                    },
                    lowestExpense: {
                        $min: "$amount"
                    },
                    totalTransaction: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    totalExpense: 1,
                    averageExpense: 1,
                    highestExpense: 1,
                    lowestExpense: 1,
                    totalTransaction: 1
                }
            }
        ])
    } catch (error) {
        next(error)
    }
}



module.exports = {getCategoryReport, getMonthlyReport, getStatisticsReport}