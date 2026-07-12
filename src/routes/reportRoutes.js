const express = require("express")
const reportRouter = express.Router()
const auth = require("../middleware/authMiddleware")
const {getCategoryReport, getMonthlyReport, getStatisticsReport} = require("../controller/reportController")



reportRouter.use(auth)



reportRouter.get('/category', getCategoryReport)
reportRouter.get('/monthly', getMonthlyReport)
reportRouter.get('/statistics', getStatisticsReport)



module.exports = reportRouter