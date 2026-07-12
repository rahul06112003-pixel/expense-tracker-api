const mongoose = require("mongoose")
const config = require("./env")



async function main() {
    try {
       mongoose.connect(config.mongoUri)
       console.log("db connected")
    } catch (error) {
        console.log(error)   
    }
   
}


module.exports = main