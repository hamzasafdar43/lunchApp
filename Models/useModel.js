const mongoose = require("mongoose")

const userModel = mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      }
})

module.exports = mongoose.model("users" , userModel)