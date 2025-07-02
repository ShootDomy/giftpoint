import express from "express";
import {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUserCtrl,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.get("/:id", getUser);
router.post("/", postUser);
router.put("/:id", putUser);
router.delete("/:id", deleteUserCtrl);

export default router;
