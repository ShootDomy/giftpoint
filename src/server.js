import app from "../index.js";
import { connectDB } from "./db/database.js";

const start = async () => {
  try {
    const db = await connectDB();

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
      );
    `);

    console.log("Tabla users creada o ya existía");

    app.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000");
    });
  } catch (error) {
    console.error("Error al iniciar la app:", error);
  }
};

start();
