const { readDb, writeDb } = require("../utils/bd");
const crypto = require("crypto");

const getAllTasksService = async () => {
  return await readDb();
};

const getOneTaskService = async (id) => {
  const tasks = await readDb();
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

const createTaskServices = async (body) => {
  const tasks = await readDb();
  const newTask = { ...body, id: crypto.randomUUID() };

  tasks.push(newTask);
  await writeDb(tasks);
  return newTask;
};

const deleteTask = async (id) => {
  const tasks = await readDb();
  const task = tasks.find((task) => task.id === id);
  tasks = [...newtasks];
  res.status(204).json();
  return newTasks;
};

module.exports = {
  getAllTasksService,
  getOneTaskService,
  createTaskServices,
  deleteTask,
};
