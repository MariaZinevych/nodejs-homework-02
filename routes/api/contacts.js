const express = require("express");

const router = express.Router();

const {
  getAllTasks,
  getOneTask,
  createTask,
  deleteTaskById,
  updateTask,
} = require("../../controllers/controllerContacts");

router.get("/", getAllTasks);

router.get("/:id", getOneTask);

router.post("/", createTask);

router.delete("/:id", deleteTaskById);

router.put("/:id", updateTask);

module.exports = { tasksRouter: router };
