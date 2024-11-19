import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
// Declaración del tipo para el token decodificado
interface DecodedToken {
  id: string;
  email: string;
}

dotenv.config();

// Este middleware verifica si el token JWT es válido
export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res
      .status(403)
      .json({ message: "Acceso denegado. Token no proporcionado." });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    if (!decoded.id || !decoded.email) {
      res.status(400).json({ message: "Token inválido" });
      return;
    }

    next();
  } catch (error) {
    console.error("Error al verificar el token", error);
    res.status(401).json({ message: "Token no válido o expirado." });
  }
};
