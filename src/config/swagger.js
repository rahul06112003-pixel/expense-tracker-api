const swaggerJsdoc = require("swagger-jsdoc")


const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Expense Tracker Api",
            version: "1.0.0",
            description: "Api documantation foe expense tracker backend"
        },

        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },

    apis: ["./src/routes/*.js"]

}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec