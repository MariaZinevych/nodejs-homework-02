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

const createTaskService = async (body) => {
  const tasks = await readDb();
  const newTask = { ...body, id: crypto.randomUUID() };

  tasks.push(newTask);
  await writeDb(tasks);
  return newTask;
};

const putTaskService = async (id, body) => {
  const tasks = await readDb();
  const task = tasks.findIndex((el) => el.id === id);
  if (task === -1) {
    return null;
  }
  tasks[task] = { id, ...body };
  await writeDb(tasks);
  return tasks[task];
};

const deleteTaskService = async (id) => {
  const tasks = await readDb();
  const index = tasks.findIndex((el) => el.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = tasks.splice(index, 1);
  await writeDb(tasks);
  return result;
};

module.exports = {
  getAllTasksService,
  getOneTaskService,
  createTaskService,
  deleteTaskService,
  putTaskService,
};
