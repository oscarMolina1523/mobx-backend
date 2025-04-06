import Task from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, userId: req.userId });
  await task.save();
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.userId },
    { title, description, completed },
    { new: true }
  );

  if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findOneAndDelete({ _id: id, userId: req.userId });
  if (!result) return res.status(404).json({ message: "Tarea no encontrada" });
  res.json({ message: "Tarea eliminada" });
};
