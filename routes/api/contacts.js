const express = require("express");

const router = express.Router();

const {
  getAllTasks,
  getOneTask,
  createTask,
  deleteTaskById,
  updateTask,
} = require("/controllers/controllerContacts");

router.get("/", getAllTasks);

router.get("/:contactId", getOneTask);

router.post("/", createTask);

router.delete("/:contactId", deleteTaskById);

router.put("/:contactId", updateTask);

module.exports = { tasksRouter: router };
