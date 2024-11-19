import * as admin from "firebase-admin";
import * as path from "path";
import * as fs from "fs";

const initializeFirebase = () => {
  try {
    const credencialesPath = path.join(
      __dirname,
      "..",
      "..",
      "credenciales.json"
    );

    console.log("credencialesPath", credencialesPath);
    const rawData = fs.readFileSync(credencialesPath, "utf8");
    const serviceAccount = JSON.parse(rawData);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("Firebase inicializado correctamente.");
  } catch (err: any) {
    console.error("Error al inicializar Firebase:", err.message);
    process.exit(1);
  }
};
export { initializeFirebase };
