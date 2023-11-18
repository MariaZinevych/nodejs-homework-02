const express = require("express");

const isValidId = require("../../utils/isValidId");
const authenticate = require("../../utils/authenticate");
const router = express.Router();

const {
  getAllTasks,
  getOneTask,
  createTask,
  deleteTaskById,
  updateTask,
  updateFavorite,
} = require("../../controllers/controllerContacts");

router.get("/", authenticate, getAllTasks);

router.get("/:id", authenticate, isValidId, getOneTask);

router.post("/", authenticate, createTask);

router.delete("/:id", authenticate, isValidId, deleteTaskById);

router.put("/:id", authenticate, isValidId, updateTask);

router.patch("/:id/favorite", authenticate, isValidId, updateFavorite);

module.exports = { tasksRouter: router };
