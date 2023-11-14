const express = require("express");

const isValidId = require("../../utils/isValidId");

const router = express.Router();

const {
  getAllTasks,
  getOneTask,
  createTask,
  deleteTaskById,
  updateTask,
  updateFavorite,
} = require("../../controllers/controllerContacts");

router.get("/", getAllTasks);

router.get("/:id", isValidId, getOneTask);

router.post("/", createTask);

router.delete("/:id", isValidId, deleteTaskById);

router.put("/:id", isValidId, updateTask);

router.patch("/:id/favorite", isValidId, updateFavorite);

module.exports = { tasksRouter: router };
