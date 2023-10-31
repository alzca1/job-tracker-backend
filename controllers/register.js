const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { encryptPassword } = require("../helpers/encryption");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const hashedPassword = encryptPassword(password);
    const user = User.create({ name: name, email: email, password: hashedPassword });
    const token = jwt.sign({ name, email }, process.env.PASSKEY, { expiresIn: "1d" });
    res.status(200).send({ msg: "User registered successfully", token });
  } catch (error) {
    res.status(500).send({ msg: "There was a problem registering the user" });
  }
};

module.exports = register;
