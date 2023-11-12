const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticationMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.PASSKEY);
    const { id, email } = decoded;
    req.user = { id, email };
    next();
  } catch (error) {
    throw new Error("Not authorized to access this route", error);
  }
};

module.exports = authenticationMiddleware;
