const express = require("express")
const app = express()
const connectDB = require('./config/db')
const authRouter = require("./routes/authRoutes")
const errorHandler = require("./middleware/errorMiddleware")
const cookieParser = require("cookie-parser")
const expenseRouter = require("./routes/expenseRoutes")
const reportRouter = require("./routes/reportRoutes")  
const config = require("./config/env")
const helmet = require("helmet")
const cors = require("cors")
const limiter = require("./middleware/rateLimiter")
const morgan = require("morgan")
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");






app.use(morgan("dev"))

app.use(express.json())

app.use(cookieParser())

app.use(
    cors({
        origin: config.clientUrl,
        credentials: true
    })
)

app.use(helmet())

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use(limiter)



app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Expense Tracker API is running 🚀",
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        timestamp: new Date().toISOString(),
    });
});




app.use('/auth', authRouter)

app.use('/expense', expenseRouter)

app.use('/report', reportRouter)








app.use(errorHandler)



async function start() {
     try {
    await connectDB()
    app.listen(config.port, () => {
    console.log(`Server is running on ${config.port}`)
    })
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
    
}


start()
