const { NotFound } = require("http-errors");
const { HttpError } = require("../httpError/httpsError");
const Joi = require("joi");

const {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  deleteTaskService,
  putTaskService,
} = require("../services/services");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.any(),
});

const getAllTasks = async (req, res, next) => {
  const tasks = await getAllTasksService();
  res.status(200).json(tasks);
};

const getOneTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await getOneTaskService(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      res.status(500).json({ message: error.message });
    }

    const newTask = await createTaskService(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newTasks = deleteTaskService(id);
    if (!newTasks) {
      res.status(500).json({ message: error.message });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      res.status(500).json({ message: error.message });
    }
    const { id } = req.params;
    const putTask = putTaskService(id, req.body);
    if (!putTask) {
      res.status(500).json({ message: error.message });
    }
    res.status(201).json(putTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  deleteTaskById,
  updateTask,
};
