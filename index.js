import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import giftcardRoutes from "./src/routes/giftcard.routes.js";
import { responseTimeLogger } from "./src/middlewares/responseTimeLogger.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();
// const port = 3000;

app.use(express.json());
app.use(responseTimeLogger);

app.get("/", (req, res) => {
  res.send("API de Giftcards funcionando 🚀");
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/giftcard", giftcardRoutes);

// app.listen(port, () => {
//   console.log(`Servidor escuchando en http://localhost:${port}`);
// });

app.use(errorHandler);

export default app;
