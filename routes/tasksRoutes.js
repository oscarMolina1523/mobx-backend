import express from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controllers/tasksController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Endpoints para gestionar tareas
 */

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
 *         description: Lista de tareas
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.get("/", verifyToken, getTasks);

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
 *       400:
 *         description: Datos de entrada inválidos
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.post("/", verifyToken, createTask);

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
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: Token no proporcionado o inválido
 */
router.put("/:id", verifyToken, updateTask);

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
router.delete("/:id", verifyToken, deleteTask);

export default router;