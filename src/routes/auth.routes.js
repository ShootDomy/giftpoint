import express from "express";
import { login, registrar } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createUserSchema, loginUserSchema } from "../schemas/userSchema.js";

const router = express.Router();

router.post("/registro", validateSchema(createUserSchema), registrar);
router.post("/login", validateSchema(loginUserSchema), login);

export default router;
