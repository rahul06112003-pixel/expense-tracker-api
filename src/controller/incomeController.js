const Income = require("../models/incomeModel")


const createIncome = async (req, res, next) => {
  try {
    const {
      title,
      amount,
      category,
      note,
      transactionDate
    } = req.body;

    const income = await Income.create({
      title,
      amount,
      category,
      note,
      transactionDate,
      user: req.user._id
    });

    res.status(201).json({
      message: "Income created successfully",
      income
    });

  } catch (error) {
    next(error);
  }
};


const getIncome = async (req, res, next) => {
  try {
    const query = {
      user: req.user._id
    };

    if (req.query.category) {
      query.category = req.query.category;
    }


    if (req.query.minAmount || req.query.maxAmount) {
     query.amount = {};

     if (req.query.minAmount) {
        query.amount.$gte = Number(req.query.minAmount);
     }

     if (req.query.maxAmount) {
        query.amount.$lte = Number(req.query.maxAmount);
     }
    }


    if (req.query.startDate || req.query.endDate) {
     query.transactionDate = {};

     if (req.query.startDate) {
        query.transactionDate.$gte = new Date(req.query.startDate);
     }

     if (req.query.endDate) {
        const end = new Date(req.query.endDate);
        end.setHours(23, 59, 59, 999);
        query.transactionDate.$lte = end;
     }
    }


    if (req.query.search) {
     query.$or = [
        {
        title: {
            $regex: req.query.search,
            $options: "i"
        }
        },
        {
        note: {
            $regex: req.query.search,
            $options: "i"
        }
        }
     ];
    }


    const allowedSortOptions = [
     "-transactionDate",
     "transactionDate",
     "-amount",
     "amount"
    ];

    const requestedSort = req.query.sort || "-transactionDate";

    const sort = allowedSortOptions.includes(requestedSort)
    ? requestedSort
    : "-transactionDate";


    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(
    50,
    Math.max(1, Number(req.query.limit) || 10)
    );

    const skip = (page - 1) * limit;

    const totalIncome = await Income.countDocuments(query);

    const incomeSummary = await Income.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);
    const totalIncomeAmount = incomeSummary[0]?.totalAmount || 0;

    const totalPages = Math.ceil(totalIncome / limit);

    const income = await Income.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit);

    res.status(200).json({
     success: true,
     income,
     summary: {
      totalIncomeAmount
     },
     pagination: {
        page,
        limit,
        totalIncome,
        totalPages
     }
    });

    } catch (error) {
     next(error);
    }
};


const updateIncome = async (req, res, next) => {
  try {
    const income = await Income.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found"
      });
    }

    Object.assign(income, req.body);

    await income.save();

    res.status(200).json({
      success: true,
      message: "Income updated successfully",
      income
    });
  } catch (error) {
    next(error);
  }
};


const deleteIncome = async (req, res, next) => {
  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Income deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  createIncome,
  getIncome,
  updateIncome,
  deleteIncome
};