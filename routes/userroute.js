const express = require("express")
const { userRegister, loginUser } = require("../Controller/userController")
const route = express.Router()


route.post("/signup" , userRegister)
route.post("/login" , loginUser)


module.exports = route