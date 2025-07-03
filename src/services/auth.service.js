// import { readData, writeData } from "../config/db.js";
import { connectDB } from "../db/database.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const registrarUsuario = async (userData) => {
  const { name, email, password } = userData;

  const db = await connectDB();

  // const data = readData();

  // VALIDAR SI EL EMAIL EXISTE
  const existeEmail = await db.get("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (existeEmail) {
    throw new Error("El correo ingresado ya existe");
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

  return { success: true, user };
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
    throw new Error("Credenciales incorrectas");
  }

  console.log("user", user);

  // VERIFICAR CONTRASEÑA
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Credenciales incorrectas");
  }

  // GENERAR TOKEN JWT
  const token = jwt.sign({ uuid: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return { uuid: user.id, token };
};
