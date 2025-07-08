// import { readData, writeData } from "../config/db.js";
import { connectDB } from "../db/database.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";

const SALT_ROUNDS = 10;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const registrarUsuario = async (userData) => {
  const { name, email, password } = userData;

  const db = await connectDB();

  // const data = readData();

  // Validar formato de email
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    throw new ApiError(400, "Formato de email inválido", {
      email: userData.email,
    });
  }

  // Validar contraseña
  if (password.length < 6) {
    throw new ApiError(400, "La contraseña debe tener 6 caracteres o más", {
      email: userData.password,
    });
  }

  // VALIDAR SI EL EMAIL EXISTE
  const existeEmail = await db.get(
    `SELECT * FROM users WHERE email = '${email}'`
  );

  if (existeEmail) {
    throw new ApiError(400, "El correo ya está registrado", {
      email: userData.email,
    });
  }

  // ECRIPTAR CONTRASEÑA
  const hashedContra = await bcrypt.hash(password, SALT_ROUNDS);

  // CREAR USUARIO
  const user = {
    uuid: uuidv4(),
    nombre: name,
    email: email,
    password: hashedContra,
  };

  // data.users.push(user);
  // writeData(data);

  await db.run(
    `INSERT INTO users (id, name, email, password)
      VALUES ($id, $name, $email, $password)`,
    {
      $id: user.uuid,
      $name: user.name,
      $email: user.email,
      $password: user.password,
    }
  );

  delete user.password;

  return user;
};

export const loginUsuario = async (userData) => {
  const { email, password } = userData;
  if (!email || !password) {
    throw new Error("Email y contraseña son requeridos");
  }

  // const data = readData();
  const db = await connectDB();

  // VERIFICAR SI EL EMAIL EXISTE
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) {
    throw new ApiError(400, "Credenciales incorrectas", {});
  }

  // console.log("user", user);

  // VERIFICAR CONTRASEÑA
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(400, "Credenciales incorrectas", {});
  }

  // GENERAR TOKEN JWT
  const token = jwt.sign(
    { uuid: user.id, name: user.name, email: user.email },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { uuid: user.id, name: user.name, token };
};
