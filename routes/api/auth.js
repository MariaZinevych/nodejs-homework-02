const express = require("express");
const authenticate = require("../../utils/authenticate");

const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verify,
  resendVerifyEmail,
} = require("../../controllers/auth.js");

const validateBody = require("../../utils/validateBody");
const upload = require("../../utils/upload.js");

const { schemas } = require("../../models/users");

const router = express.Router();

// signup
router.post("/register", validateBody(schemas.registerSchema), register);

// signin
router.post("/login", validateBody(schemas.loginSchema), login);
router.post("/verify", validateBody(schemas.emailSchema), resendVerifyEmail);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);
router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);
router.get("/verify/:token", verify);
module.exports = { authRouter: router };
