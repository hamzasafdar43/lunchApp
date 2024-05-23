const mongoose = require("mongoose")

const foodSchema = mongoose.Schema({
    foodName :{
        type:String,
        required: true
    }, 
    price :{
        type:Number,
        required:true
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    //     index: { expires: '10000' } // Automatically delete document 1 hour after creation
    //   }
})

module.exports = mongoose.model("lunch" , foodSchema)