import { Request, Response } from "express";
import { UserService } from "../services/userService";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

export class UserController {
  // Método para crear un nuevo usuario
  static createUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email es requerido" });
      return;
    }

    try {
      const user = await UserService.createUser(email);
      res.status(201).send(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  static async getUserByEmail(req: Request, res: Response) {
    const { email } = req.params;

    if (!email) {
      res.status(400).send("Email es requerido.");
      return;
    }

    try {
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        res.status(404).send({ message: "Usuario no encontrado" });
        return;
      }
      dotenv.config();
      const JWT_SECRET = process.env.JWT_SECRET || "20241110@NDR3S";

      const token = jwt.sign({ id: user.uid, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        user,
        token,
      });

      res.status(200).send(user); // Devolver la información del usuario
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
