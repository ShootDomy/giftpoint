import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/users.service.js";

export const getUsers = (req, res) => {
  const users = getAllUsers();
  res.json(users);
};

export const getUser = (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user);
};

export const postUser = (req, res) => {
  const newUser = createUser(req.body);
  res.status(201).json(newUser);
};

export const putUser = (req, res) => {
  const updatedUser = updateUser(req.params.id, req.body);
  if (!updatedUser)
    return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(updatedUser);
};

export const deleteUserCtrl = (req, res) => {
  const deleted = deleteUser(req.params.id);
  if (!deleted)
    return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(deleted);
};
