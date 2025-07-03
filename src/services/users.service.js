import { readData, writeData } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "../db/database.js";

export const getAllUsers = async () => {
  // const data = readData();
  const db = await connectDB();
  const users = await db.all(`SELECT * FROM users`);

  db.close();
  return users;
  // return data.users;
};

export const getUserById = (id) => {
  const data = readData();
  return data.users.find((user) => user.uuid === id);
};

export const createUser = (body) => {
  const data = readData();
  const user = { uuid: uuidv4(), ...body };
  data.users.push(user);
  writeData(data);
  return user;
};

export const updateUser = (id, body) => {
  const data = readData();
  const user = data.users.find((u) => u.uuid === id);
  if (!user) return null;
  user.email = body.email;
  user.password = body.password;
  writeData(data);
  return user;
};

export const deleteUser = (id) => {
  const data = readData();
  const user = data.users.find((u) => u.uuid === id);
  data.users = data.users.filter((u) => u.uuid !== id);
  writeData(data);
  return user;
};
