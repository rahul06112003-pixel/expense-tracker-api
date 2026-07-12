const Expense = require("../models/expense")



const createExpense = async (req, res, next) => {
    try {
       const {title, amount, category, note, transactionDate} = req.body

       const expense = await Expense.create({
        title,
        amount,
        category,
        note,
        transactionDate,
        user: req.user._id
       })

       res.status(201).json({
        message: "expense created",
        expense
       })


    } catch (error) {
        next(error)
    }

}


const readAllExpense = async (req, res, next) => {
    try {
      const query = {
        user: req.user._id
      }

      if(req.query.category){
        query.category = req.query.category
      }

      if(req.query.minAmount || req.query.maxAmount){
        query.amount = {}

        if(req.query.minAmount){
            query.amount.$gte = Number(req.query.minAmount)
        }

        if(req.query.maxAmount){
            query.amount.$lte = Number(req.query.maxAmount)
        }

      }

      
      if(req.query.startDate || req.query.endDate){
        query.transactionDate = {}

        if(req.query.startDate){
            query.transactionDate.$gte = new Date(req.query.startDate)
        }

        if(req.query.endDate){
            const end = new Date(req.query.endDate)
            end.setHours(23, 59, 59, 999)
            query.transactionDate.$lte = end
        }

      }

      
      if(req.query.search){
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
        ]
      }

      const sort = req.query.sort || "-transactionDate"

      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 10

      const skip = (page-1)*limit


      const expense = await Expense.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      

      res.status(200).json({
        expense
      })
    } catch (error) {
        next(error)
    }
   
}


const readOneExpense = async (req, res, next) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user._id
        })
        if(!expense){
            return res.status(400).json({
                message: "expense not exist"
            })
        }

        res.status(200).json({
            expense
        })
    } catch (error) {
        next(error)
    }
}


const updateExpense = async (req, res, next) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user._id
        })
        if(!expense){
            return res.status(400).json({
                message: "expense not exist"
            })
        }

        Object.assign(expense, req.body)

        await expense.save()

        res.status(200).json({
            message: "expense update sucessfully",
            expense
        })
    } catch (error) {
        next(error)
    }
}


const deleteExpense = async (req, res, next) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            user: req.user._id
        })
        if(!expense){
            return res.status(400).json({
                message: "expense not exist"
            })
        }

        await expense.deleteOne()

        res.status(200).json({
            message: "expense deleted succesfully"
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {createExpense, readAllExpense, readOneExpense, updateExpense, deleteExpense}