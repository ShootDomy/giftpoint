import { registrarUsuario } from "../services/auth.service.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const resgistrarUsuario = async (req, res) => {
  try {
    const user = await registrarUsuario(req.body);

    // GENERAR TOKEN JWT
    const token = jwt.sign({ uuid: user.uuid, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error.message });
  }
};
