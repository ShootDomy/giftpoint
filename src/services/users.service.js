import { readData, writeData } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "../db/database.js";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/apiError.js";
import {
  eliminarGiftUserId,
  getAllGiftcardsByUser,
} from "./giftcard.service.js";

const SALT_ROUNDS = 10;

export const getAllUsers = async () => {
  // const data = readData();
  const db = await connectDB();
  const users = await db.all(`
    SELECT id, name, email FROM users
  `);

  db.close();

  return users;
};

export const getUserById = async (id) => {
  // const data = readData();

  const db = await connectDB();

  const user = await db.get(`
    SELECT id, name, email FROM users WHERE id = '${id}'
  `);

  if (!user) {
    throw new ApiError(400, "No se ha encontrado el usuario", {
      id: id,
    });
  }

  db.close();

  return user;
};

export const createUser = (body) => {
  const data = readData();
  const user = { uuid: uuidv4(), ...body };
  data.users.push(user);
  writeData(data);
  return user;
};

export const updateUser = async (id, body) => {
  // const data = readData();

  const db = await connectDB();

  const user = await getUserById(id);

  user.name = body.name;
  user.email = body.email;
  // user.password = body.password;

  let actualizarContra = "";
  if (body.password && body.password !== "") {
    if (body.password.length < 6) {
      throw new ApiError(400, "La contraseña debe tener 6 caracteres o más", {
        email: body.password,
      });
    }

    // ECRIPTAR CONTRASEÑA
    const hashedContra = await bcrypt.hash(body.password, SALT_ROUNDS);

    user.password = hashedContra;
    actualizarContra = ` , password = $password `;
  }

  // console.log("body", body);
  // console.log("user", user);

  await db.run(
    `UPDATE users SET name = $name, email = $email ${actualizarContra} WHERE id = $id`,
    {
      $id: id,
      $name: user.name,
      $email: user.email,
      $password: user.password,
    }
  );

  db.close();

  // writeData(data);
  return user;
};

export const deleteUser = async (id) => {
  // const data = readData();

  const db = await connectDB();

  const giftcards = await getAllGiftcardsByUser(id);

  if (giftcards.length > 0) {
    await eliminarGiftUserId(id);
  }

  await db.run(`DELETE FROM users WHERE id = $id`, {
    $id: id,
  });

  db.close();

  return {
    success: true,
    message: "Usuario eliminado exitosamente",
  };

  // const user = data.users.find((u) => u.uuid === id);
  // data.users = data.users.filter((u) => u.uuid !== id);
  // writeData(data);
  // return user;
};
