const { decryptPassword } = require("../helpers/encryption");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const login = async (req, res) => {
  console.log("Logging in user with @login controller");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("The user login, at @login controller, did not succeed due to missing fields");
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    console.log("Let's find your user in the db...");
    const user = await User.findOne({ email });
    if (!user) {
      console.login("Unfortunately we can't find you in the db :(");
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
