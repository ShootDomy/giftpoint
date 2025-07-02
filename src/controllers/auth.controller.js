import { registrarUsuario } from "../services/auth.service.js";

export const resgistrarUsuario = async (req, res) => {
  const user = await registrarUsuario(req.body);

  res.status(201).json(user);
};
