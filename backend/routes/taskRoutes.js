import taskController from "../controllers/taskController.js";
import authGuard from "../middleware/authGuard.js";
import Router from "express";

const taskRoutes = Router();

taskRoutes.post("/create", authGuard, taskController.createTask);
taskRoutes.get("/", authGuard, taskController.getAllTasks);
taskRoutes.get("/:id", authGuard, taskController.getTaskById);
taskRoutes.put("/update/:id", authGuard, taskController.updateTask);
taskRoutes.delete("/delete/:id", authGuard, taskController.deleteTask);

export default taskRoutes;
