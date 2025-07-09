import express from "express";
import {
  getUsers,
  getUser,
  actualizarUsuarios,
  deleteUserCtrl,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { updateUserSchema } from "../schemas/userSchema.js";

const router = express.Router();

/*verifyToken */
router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);
// router.post("/", postUser);
router.put(
  "/:id",
  verifyToken,
  validateSchema(updateUserSchema),
  actualizarUsuarios
);
router.delete("/:id", verifyToken, deleteUserCtrl);

export default router;
