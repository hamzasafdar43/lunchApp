const express = require("express")
const { getFood, addFood, deleteFood, updateFood } = require("../Controller/foodController")
const router = express.Router()


router.get("/allFood" , getFood)
router.post("/addFood" , addFood)
router.delete("/deleteFood/:id" , deleteFood)
router.put("/updateFood/:id" , updateFood)

module.exports = router