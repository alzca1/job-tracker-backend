const { decryptPassword } = require("../helpers/encryption");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = decryptPassword(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ name: user.name, email: user.email }, process.env.PASSKEY, {
        expiresIn: "1d",
      });

      res.status(200).send({ msg: "User logged in succesfully", token });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = login;
