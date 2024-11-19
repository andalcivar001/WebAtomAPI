import * as admin from "firebase-admin";
import { Task } from "../models/task";

export class TaskService {
  static getAllTasks = async () => {
    try {
      const snapshot = await admin
        .firestore()
        .collection("tasks")
        .orderBy("fechaCreacion", "desc")
        .get();

      if (snapshot.empty) {
        return [];
      }

      const tasks = snapshot.docs.map((doc) => {
        const taskData = doc.data() as Omit<Task, "id">;
        // Convertimos el Timestamp de Firestore a un objeto Date

        // Formateamos la fecha si es necesario, por ejemplo:
        const formattedFechaCreacion = new Date(
          taskData.fechaCreacion?.toDate()!
        );

        return {
          id: doc.id,
          ...taskData,
          fechaCreacion: formattedFechaCreacion,
        };
      });

      return tasks;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  static getTaskById = async (taskId: string) => {
    try {
      const taskDoc = await admin
        .firestore()
        .collection("tasks")
        .doc(taskId)
        .get();
      if (!taskDoc.exists) {
        return null;
      }
      const taskData = taskDoc.data() as Omit<Task, "id">; // Omitir el id para agregarlo después
      const task: Task = {
        id: taskDoc.id, // Asignamos el id de Firestore
        ...taskData, // El resto de los campos
      };
      return task;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  static createTask = async (task: Task) => {
    try {
      const taskModified = {
        ...task,
        fechaCreacion: admin.firestore.FieldValue.serverTimestamp(),
      };
      const taskRef = await admin
        .firestore()
        .collection("tasks")
        .add(taskModified);
      const newTask = await taskRef.get();
      return { id: newTask.id, ...newTask.data() } as Task;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  static updateTask = async (taskId: string, taskData: Task) => {
    try {
      const taskRef = admin.firestore().collection("tasks").doc(taskId);
      const taskDoc = await taskRef.get();

      if (!taskDoc.exists) {
        return null;
      }

      const { ...updatedTaskData } = taskData;

      await taskRef.update({
        ...updatedTaskData,
      });

      const updatedTask = await taskRef.get();
      return { id: updatedTask.id, ...updatedTask.data() };
    } catch (error: any) {
      throw new Error(error);
    }
  };

  static deleteTask = async (taskId: string) => {
    try {
      const taskRef = admin.firestore().collection("tasks").doc(taskId);
      const taskDoc = await taskRef.get();

      if (!taskDoc.exists) {
        return null;
      }

      await taskRef.delete();
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
