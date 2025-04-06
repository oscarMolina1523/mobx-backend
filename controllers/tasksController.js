import Task from "../models/taskModel.js";

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtiene todas las tareas del usuario
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   completed:
 *                     type: boolean
 *                   userId:
 *                     type: string
 */
export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
};

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *                 userId:
 *                   type: string
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Token no proporcionado o inválido
 */
export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, userId: req.userId });
  await task.save();
  res.status(201).json(task);
};

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea existente
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea
 *               completed:
 *                 type: boolean
 *                 description: Estado de la tarea (completada o no)
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *                 userId:
 *                   type: string
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: Token no proporcionado o inválido
 */
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

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea existente
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la tarea a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: Token no proporcionado o inválido
 */
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findOneAndDelete({ _id: id, userId: req.userId });
  if (!result) return res.status(404).json({ message: "Tarea no encontrada" });
  res.json({ message: "Tarea eliminada" });
};