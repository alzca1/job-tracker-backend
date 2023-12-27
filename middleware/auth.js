const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticationMiddleware = async (req, res, next) => {
  console.log("Authenticating user with @authenticationMiddleware middleware");
  const { authorization } = req.headers;

  if (!authorization) {
    console.log("The user is not authorized to access this route");
    return res.status(401).json({ msg: "Unauthorized" });
  }

  console.log("token is present, let's verify it");
  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.PASSKEY);
    const { id, email } = decoded;
    console.log("id and email decoded successfully");
    req.user = { id, email };
    console.log("User is authorized to access this route");
    next();
  } catch (error) {
    throw new Error("Not authorized to access this route", error);
  }
};

module.exports = authenticationMiddleware;
