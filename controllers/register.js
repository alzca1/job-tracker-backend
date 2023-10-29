const jwt = require("jsonwebtoken");

const register = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const token = jwt.sign({ name, email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).send({ msg: "User registered successfully", token });
  } catch (error) {
    res.status(500).send({ msg: "There was a problem registering the user" });
  }
};

module.exports = register;
