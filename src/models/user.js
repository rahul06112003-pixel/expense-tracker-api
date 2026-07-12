const mongoose = require('mongoose')
const {Schema} = mongoose


const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim:true
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8
    }
},{ timestamps: true })

const User = mongoose.model("User",userSchema);

module.exports = User;