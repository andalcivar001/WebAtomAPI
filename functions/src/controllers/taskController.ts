import { Request, Response } from "express";
import { TaskService } from "../services/taskService";
import { Task } from "../models/task";

export class TaskController {
  static getAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await TaskService.getAllTasks();

      if (tasks.length === 0) {
        res.status(204).json(tasks);
        return;
      }

      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  static getTaskById = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    try {
      const task = (await TaskService.getTaskById(taskId)) as Task;
      if (!task) {
        res.status(404).json({ message: "Tarea no encontrada." });
        return;
      }
      res.status(200).json(task);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  static createTask = async (req: Request, res: Response) => {
    const { titulo, descripcion, estado }: Task = req.body;
    if (!titulo || !descripcion || !estado) {
      res.status(400).json({ message: "Faltan campos obligatorios." });
      return;
    }

    try {
      const newTask = await TaskService.createTask(req.body as Task);
      res.status(201).json(newTask);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  static updateTask = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const { titulo, descripcion, estado } = req.body;

    if (!titulo || !descripcion || !estado) {
      res.status(400).json({ message: "Faltan campos obligatorios." });
      return;
    }

    try {
      const updatedTask = await TaskService.updateTask(taskId, {
        titulo,
        descripcion,
        estado,
      });

      if (!updatedTask) {
        res.status(404).json({ message: "Tarea no encontrada." });
        return;
      }

      res.status(200).json(updatedTask);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  static deleteTask = async (req: Request, res: Response) => {
    const taskId = req.params.id;

    try {
      const result = await TaskService.deleteTask(taskId);

      if (!result) {
        res.status(404).json({ message: "Tarea no encontrada." });
        return;
      }

      res.status(200).json({ message: "Tarea eliminada exitosamente." });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
