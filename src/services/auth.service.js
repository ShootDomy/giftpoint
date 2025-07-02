import { readData, writeData } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const registrarUsuario = async (userData) => {
  const data = readData();

  // VALIDAR SI EL EMAIL EXISTE
  const existeEmail = data.users.find((u) => u.email === userData.email);
  if (existeEmail) {
    throw new Error("Usuario ya registrado");
  }

  // ECRIPTAR CONTRASEÑA
  const hashedContra = await bcrypt.hash(userData.password, SALT_ROUNDS);

  // CREAR USUARIO
  const user = {
    uuid: uuidv4(),
    email: userData.email,
    password: hashedContra,
  };

  data.users.push(user);
  writeData(data);

  return user;
};
