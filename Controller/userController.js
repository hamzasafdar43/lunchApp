const User = require("../Models/useModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const useModel = require("../Models/useModel");

const jwt_key = "food_app";

const userRegister = async (req, res) => {
  try {
    const { name, email, password , role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({ name, email, password: secPassword , role: role || 'user' });

    await user.save();

    const token = jwt.sign({ userID: user._id }, jwt_key);

    res.status(201).send({
      message: "User successfully registered",
      data: {
        token,
        user,
        role: user.role
      },
    });
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
};


// Login user ....

const loginUser = async(req , res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
          return res.status(400).send({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).send({ message: "Invalid email or password" });
        }
    
        // Compare the password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).send({ message: "Invalid email or password" });
        }
        res.status(200).send({ message: "Login successful" });
      } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
      }
}

module.exports ={ userRegister  , loginUser};
