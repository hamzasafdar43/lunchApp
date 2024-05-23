const express = require("express");
const app = express();
const PORT = 5000
const mongoose = require("mongoose");
const {userRegister , loginUser} = require("./Controller/userController");
const dotenv = require("dotenv");
const  router  = require("./routes/foodRoute");
const  route  = require("./routes/userroute");

//dotenv conig
dotenv.config();
app.use(express.json())
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open",()=>{
    console.log("database is connected")
})
app.get("/",(req,res)=>{
  res.send("welcome food app" )
})
app.use("/" , router)
app.use("/" ,route)



app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});