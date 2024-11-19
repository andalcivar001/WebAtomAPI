//import { initializeFirebase } from "./config/firebase";
import * as express from "express";
import { onRequest } from "firebase-functions/v2/https";
import { taskRoutes } from "./routes/taskRoutes"; // Importar las rutas
import { userRoutes } from "./routes/userRoutes";
import { initializeFirebase } from "./config/firebase";
import * as cors from "cors";

initializeFirebase();

// Crear aplicación de Express
const app = express();
app.use(
  cors({
    origin: ["http://localhost:4200", "https://test-3b3cf.web.app"],
  })
);

app.use(express.json());

// Usar las rutas de tareas bajo el prefijo "/api"
app.use("/api", taskRoutes);
app.use("/api", userRoutes);

// funnciones para las tareas

export const getTasks = onRequest(app);
export const getTaskById = onRequest(app);
export const createTask = onRequest(app);
export const updateTask = onRequest(app);
export const deleteTask = onRequest(app);

//funciones para usuarios
export const createUser = onRequest(app);
export const getUserByEmail = onRequest(app);
