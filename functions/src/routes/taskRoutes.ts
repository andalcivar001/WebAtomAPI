import { Router } from "express";
import { TaskController } from "../controllers/taskController";
import { validateToken } from "../middleware/authMiddleware";
const router = Router();

//valido el token con el middleware
router.get("/tasks", validateToken, TaskController.getAllTasks);
router.get("/tasks/:id", validateToken, TaskController.getTaskById);
router.post("/tasks", validateToken, TaskController.createTask);
router.put("/tasks/:id", validateToken, TaskController.updateTask);
router.delete("/tasks/:id", validateToken, TaskController.deleteTask);
export const taskRoutes = router;
