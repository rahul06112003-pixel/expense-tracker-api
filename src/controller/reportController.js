const Expense = require("../models/expenseModel")
const Income = require("../models/incomeModel");
const getDateRange = require("../utils/dateRange");



const getCategoryReport = async (req, res, next) => {
    try {
        
        const dateFilter = getDateRange(req.query);

        const matchQuery = {
        user: req.user._id,
        };

        if (dateFilter) {
        matchQuery.transactionDate = dateFilter;
        }

        const report = await Expense.aggregate([
            {
                $match: matchQuery
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
       const dateFilter = getDateRange(req.query);

        const matchQuery = {
        user: req.user._id,
        };

        if (dateFilter) {
        matchQuery.transactionDate = dateFilter;
        }

        const report = await Expense.aggregate([
            {
                $match: matchQuery
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



const getMonthlyIncomeReport = async (req, res, next) => {
  try {
    
   const dateFilter = getDateRange(req.query);

    const matchQuery = {
    user: req.user._id,
    };

    if (dateFilter) {
    matchQuery.transactionDate = dateFilter;
    }

    const report = await Income.aggregate([
      {
        $match: matchQuery
      },
      {
        $group: {
          _id: {
            year: { $year: "$transactionDate" },
            month: { $month: "$transactionDate" }
          },
          totalIncome: {
            $sum: "$amount"
          }
        }
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalIncome: 1
        }
      },
      {
        $sort: {
          year: 1,
          month: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      report
    });
  } catch (error) {
    next(error);
  }
};



const getStatisticsReport = async (req, res, next) => {
    try {
       const dateFilter = getDateRange(req.query);

        const matchQuery = {
        user: req.user._id,
        };

        if (dateFilter) {
        matchQuery.transactionDate = dateFilter;
        }

        const report = await Expense.aggregate([
            {
                $match: matchQuery
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

        res.status(200).json({
         success: true,
         report: report[0] || {
         totalExpense: 0,
         averageExpense: 0,
         highestExpense: 0,
         lowestExpense: 0,
         totalTransaction: 0
         }
        });
    } catch (error) {
        next(error)
    }
}



module.exports = {getCategoryReport, getMonthlyReport, getStatisticsReport, getMonthlyIncomeReport}