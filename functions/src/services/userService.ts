import * as admin from "firebase-admin";

export class UserService {
  static async getUserByEmail(email: string) {
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      return userRecord;
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        return null;
      }
      throw new Error(error);
    }
  }

  static createUser = async (email: string) => {
    try {
      let userRecord;
      try {
        userRecord = await admin.auth().getUserByEmail(email);
      } catch (err: any) {
        if (err.code !== "auth/user-not-found") {
          throw err;
        }
        userRecord = null;
      }

      if (userRecord) {
        throw new Error(
          "No se puede crear el usuario, email ya está registrado."
        );
      }

      const nuevoUsuario = await admin.auth().createUser({
        email,
        emailVerified: true,
      });

      // Generar el enlace de verificación
      //   const link = await admin.auth().generateEmailVerificationLink(email);

      //   return {
      //     message: "Usuario creado con éxito. Por favor verifica tu correo.",
      //     verificationLink: link,
      //   };

      return nuevoUsuario;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}
