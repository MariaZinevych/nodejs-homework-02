const express = require("express");
const authenticate = require("../../utils/authenticate");

const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controllers/auth.js");

const validateBody = require("../../utils/validateBody");

const { schemas } = require("../../models/users");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), register);

// signin
router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

module.exports = { authRouter: router };
