const {
  getAllTasksService,
  getOneTaskService,
  createTaskServices,
  deleteTask,
} = require("../services/services");

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
    const newTask = await createTaskServices(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTaskById = async (req, res, next) => {
  const { id } = req.params;
  const newtasks = tasks.filter((el) => el.id !== id);
  tasks = [...newtasks];
  res.status(204).json();
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, text } = req.body;
  const [task] = tasks.filter((el) => el.id === id);
  task.title = title;
  task.text = text;
  res.json({
    status: "success",
    code: 200,
    data: { task },
  });
};

module.exports = {
  getAllTasks,
  getOneTask,
  createTask,
  deleteTaskById,
  updateTask,
};
