import { loginUsuario, registrarUsuario } from "../services/auth.service.js";

export const registrar = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  try {
    const user = await registrarUsuario(req.body);

    res.status(201).json({
      success: true,
      message: "Usuario creado exitosamente",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await loginUsuario(req.body);

    res.status(200).json({
      success: true,
      message: `Bienvenido ` + (data.name ? data.name : ""),
      data,
    });
  } catch (error) {
    next(error);
  }
};
