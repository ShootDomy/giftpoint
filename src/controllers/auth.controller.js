import { loginUsuario, registrarUsuario } from "../services/auth.service.js";

export const registrar = async (req, res) => {
  try {
    const user = await registrarUsuario(req.body);

    res.status(201).json(user);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await loginUsuario(req.body);
    res.status(201).json({ token });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error.message });
  }
};
