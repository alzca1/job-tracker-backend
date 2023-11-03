const express = require("express");

const router = express.Router();
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const createApplication = require("../controllers/application/create");
const deleteApplication = require("../controllers/application/delete");
const authenticationMiddleware = require("../middleware/auth");
const getAllApplications = require("../controllers/application/getAll");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/application/create").post(authenticationMiddleware, createApplication);
router
  .route("/application/delete/:applicationId")
  .delete(authenticationMiddleware, deleteApplication);
router.route("/application/getAll").get(authenticationMiddleware, getAllApplications);

module.exports = router;
