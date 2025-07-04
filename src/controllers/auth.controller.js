import { loginUsuario, registrarUsuario } from "../services/auth.service.js";

export const registrar = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  // Validar formato de email
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
    return res.status(400).json({ error: "Formato de email inválido" });
  }

  // Validar contraseña
  if (req.body.password.length < 6) {
    return res
      .status(400)
      .json({ error: "La contraseña debe tener 6 caracteres o más" });
  }

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
    const data = await loginUsuario(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error.message });
  }
};
