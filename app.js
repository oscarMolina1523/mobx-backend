import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/tasksRoutes.js";
import setupSwagger from './utils/swagger.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Task Manager API', documentation: '/api-docs' });
});

setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;
