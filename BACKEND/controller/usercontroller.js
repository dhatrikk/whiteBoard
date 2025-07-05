const userModel = require("../models/usermodel");
const jwt = require("jsonwebtoken");

const registerUser = async function (req, res) {
  try {
    const newUser = await userModel.registerUser(req.body);
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(401).json(error.message);
  } 
};

const loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.loginUser(email, password);

    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(401).json(error.message);
  }
};

const getUser = async function (req, res) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const email = decoded.email;

    const user = await userModel.getUser(email);
    res.status(201).json({ user });
  } catch (error) {
    res.status(401).json(error.message);
  }
};

module.exports = {
  registerUser,
  getUser,
  loginUser,
};
