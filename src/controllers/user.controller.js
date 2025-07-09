import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../services/users.service.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res
      .status(200)
      .json({ success: true, message: "Usuarios encontrados", data: users });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id)
      return res
        .status(400)
        .json({ success: false, message: "Falta el parámetro id" }, {});

    console.log("id", id);
    const user = await getUserById(id);

    console.log("user", user);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });

    res
      .status(200)
      .json({ success: true, message: "Usuario encontrado", data: user });
  } catch (error) {
    next(error);
  }
};

export const postUser = (req, res) => {
  const newUser = createUser(req.body);
  res.status(201).json(newUser);
};

export const actualizarUsuarios = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Falta el parámetro id" }, {});
    }

    const updatedUser = await updateUser(id, req.body);

    res.status(200).json({
      success: true,
      message: "Usuario actualizado exitosamente",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserCtrl = async (req, res, next) => {
  try {
    const eliminar = await deleteUser(req.params.id);

    res.status(200).json(eliminar);
  } catch (error) {
    next(error);
  }
};
