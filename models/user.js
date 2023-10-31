const mongoose = require("mongoose")
require('dotenv').config()
const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        token:{
            type:String,
        },
        
    }
)
module.exports = mongoose.model("user",userSchema)