const express = require("express");

const router = express.Router();
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const createApplication = require("../controllers/application/create");
const deleteApplication = require("../controllers/application/delete");
const authenticationMiddleware = require("../middleware/auth");
const getAllApplications = require("../controllers/application/getAll");
const updateApplication = require("../controllers/application/update");
const getApplication = require("../controllers/application/get");
const getJobInfo = require("../controllers/application/getJobInfo");

//## LOGIN ROUTES ## //
router.route("/register").post(register);
router.route("/login").post(login);

//## APPLICATION ROUTES ## //
router.route("/application/create").post(authenticationMiddleware, createApplication);
router
  .route("/application/delete/:applicationId")
  .delete(authenticationMiddleware, deleteApplication);
router.route("/application/getAll").get(authenticationMiddleware, getAllApplications);
router.route("/application/:applicationId").get(authenticationMiddleware, getApplication);
router.route("/application/update").put(authenticationMiddleware, updateApplication);
router.route("/application/getjobinfo").post(getJobInfo);

module.exports = router;
