const express = require("express")
const reportRouter = express.Router()
const auth = require("../middleware/authMiddleware")
const {getCategoryReport, getMonthlyReport, getStatisticsReport, getMonthlyIncomeReport} = require("../controller/reportController")



reportRouter.use(auth)



reportRouter.get('/category', getCategoryReport)
reportRouter.get('/monthly', getMonthlyReport)
reportRouter.get('/statistics', getStatisticsReport)
reportRouter.get("/monthly-income", getMonthlyIncomeReport);



module.exports = reportRouter