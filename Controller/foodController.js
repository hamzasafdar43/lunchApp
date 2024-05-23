const Food = require("../Models/foodmodel")
const mongodb = require("mongodb")

// Add Food .....
const addFood = async(req, res) => {
  try {
    const {foodName, price} = req.body

    if(!foodName || !price){
        res.status(403).send({message:"All fields are required"})
    }

    let food = new Food({foodName , price})
    food.save()
    res.status(201).send({ message: "Food item successfully added", food });
  } catch (error) {
    res.status(400).send({message:"server error" , error : error.message})
  }

}

// Get Food .....
const getFood =  async(req, res) => {
  try {
    const food = await Food.find({})
    res.status(200).send({food})
  } catch (error) {
    res.status(400).send({message:"server error" , error: error.message})
  }
}

// Delete Food .....
const deleteFood = async (req, res) => {
    try {
      const id = req.params.id;
      
      // Validate the id
      if (!mongodb.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Invalid ID format" });
      }
      
      console.log(id);
  
      const food = await Food.deleteOne({ _id: new mongodb.ObjectId(id) });
  
      res.status(200).send({ message: "Food item successfully deleted", food });
    } catch (error) {
      res.status(400).send({ message: "Server error", error: error.message });
    }
  };


  const updateFood = async(req, res) => {
   try {
    const {foodName , price} = req.body
    console.log(req.params.id)
    const updateFood = await Food.findByIdAndUpdate(req.params.id , {foodName , price} , {new:true})
    if(!updateFood){
      res.status(403).send({message:"Food not Update try angin"})
    }
    res.send( updateFood)
   } catch (error) {
    res.status(400).send({ message: "Server error", error: error.message });
   }
  }


module.exports = {addFood , deleteFood , getFood , updateFood }