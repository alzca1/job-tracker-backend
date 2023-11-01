const express = require("express");

const router = express.Router();
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const createApplication = require("../controllers/application/create");
const authenticationMiddleware = require("../middleware/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/application/create").post(authenticationMiddleware, createApplication);

module.exports = router;
