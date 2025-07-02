import express from "express";
import userRoutes from "./src/routes/user.routes.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de Usuarios funcionando 🚀");
});

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
