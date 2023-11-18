const { Contact, schemas } = require("../models/contacts");

const getAllTasks = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const tasks = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.status(200).json(tasks);
};

const getOneTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Contact.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      res.status(500).json({ message: error.message });
    }
    const newTask = await Contact.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newTasks = await Contact.findByIdAndDelete(id);
    if (!newTasks) {
      res.status(500).json({ message: error.message });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      res.status(406).json({ message: error.message });
    }
    const { id } = req.params;
    const putTask = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!putTask) {
      res.status(500).json({ message: error.message });
    }
    res.status(201).json(putTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      res.status(500).json({ message: error.message });
    }
    const { id } = req.params;
    const putTask = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
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
  updateFavorite,
};
