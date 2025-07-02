import app from "../index.js";
import { connectDB } from "./db/database.js";
import { SQL_SCHEMA } from "./db/schema.js";

const start = async () => {
  try {
    const db = await connectDB();

    await db.exec(SQL_SCHEMA);

    app.listen(3000, () => {
      console.log("Servidor corriendo en http://localhost:3000");
    });
    console.log("✅ Tablas recreadas exitosamente");
  } catch (error) {
    console.error("❌ Error al iniciar la app:", error);
  }
};

start();
