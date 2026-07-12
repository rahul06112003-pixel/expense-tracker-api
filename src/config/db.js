const mongoose = require("mongoose")
const config = require("./env")



async function main() {
    try {
      await mongoose.connect(config.mongoUri)
       console.log("db connected")
    } catch (error) {
        console.error(error)
        process.exit(1)   
    }
   
}


module.exports = main