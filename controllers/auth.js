const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
var Jimp = require("jimp");

const sendEmail = require("../utils/sendEmail");

const { User } = require("../models/users");
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({ message: "Email already in use" });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verifyToken = crypto.randomUUID();

  await sendEmail({
    to: email,
    subject: "Welcome",
    html: `To confirm your registration please click on the <a href="http://localhost:3000/api/auth/verify/${verifyToken}">link</a>`,
    text: `To confirm your registration please open the link http://localhost:3000/api/auth/verify/${verifyToken}`,
  });

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verifyToken,
  });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "Email or password invalid" });
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    res.status(401).json({ message: "Email or password invalid" });
  }

  if (user.verify !== true) {
    return res.status(401).send({ message: "Your account is not verified" });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.json({
    token,
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;

  res.json({
    email,
    name,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);

  const avatar = await Jimp.read(resultUpload);
  avatar.resize(250, 250).write(resultUpload);

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

async function verify(req, res, next) {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verifyToken: token }).exec();

    if (user === null) {
      return res.status(404).send({ message: "Not found" });
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });

    res.send({ message: "Email confirm successfully" });
  } catch (error) {
    next(error);
  }
}

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).send({ message: " Email not found" });
  }
  if (user.verify) {
    return res.status(401).send({ message: "Email already verify" });
  }

  await sendEmail({
    to: email,
    subject: "Welcome",
    html: `To confirm your registration please click on the <a href="http://localhost:3000/api/auth/verify/${user.verifyToken}">link</a>`,
    text: `To confirm your registration please open the link http://localhost:3000/api/auth/verify/${user.verifyToken}`,
  });

  res.json({
    message: "Verify email send success",
  });
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verify,
  resendVerifyEmail,
};
