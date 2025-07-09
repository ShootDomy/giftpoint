import { readData, writeData } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "../db/database.js";
import { ApiError } from "../utils/apiError.js";
import {
  eliminarGiftUserId,
  getAllGiftcardsByUser,
} from "./giftcard.service.js";

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

  await db.run(`UPDATE users SET name = $name, email = $email WHERE id = $id`, {
    $id: id,
    $name: user.name,
    $email: user.email,
  });

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
