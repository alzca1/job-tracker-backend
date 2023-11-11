const { decryptPassword } = require("../../helpers/encryption");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const login = async (req, res) => {
  console.log(`Logging in user ${req.body.email} with @login controller`);

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("The user login, at @login controller, did not succeed due to missing fields");
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    console.log("Let's find your user in the db...");
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Unfortunately we can't find you in the db :(");
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = decryptPassword(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.PASSKEY,
        {
          expiresIn: "1d",
        }
      );
      console.log(`User ${email} logged in succesfully`);
      return res.status(200).send({
        name: user.name,
        email: user.email,
        token: token,
      });
    }
    console.log(`User ${email} password is incorrect`);
    res.status(400).json({ msg: "Password is incorrect" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "There was a problem logging in the user" });
  }
};

module.exports = login;
