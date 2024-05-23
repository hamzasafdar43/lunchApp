const express = require("express");
const app = express();
const PORT = 5000
const mongoose = require("mongoose");
const {userRegister , loginUser} = require("./Controller/userController");
const {addFood , deleteFood, getFood , updateFood } = require("./Controller/foodController");
const dotenv = require("dotenv")

//dotenv conig
dotenv.config();
app.use(express.json())
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open",()=>{
    console.log("database is connected")
})
app.get("/",(req,res)=>{
  res.send("welcome")
})
app.post("/Sign-Up" , userRegister)
app.post("/login" , loginUser)
app.post("/lunch" , addFood )
app.delete("/deleteFood/:id" , deleteFood )
app.get("/allFood" , getFood )
app.put("/updateFood/:id" , updateFood )


app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});