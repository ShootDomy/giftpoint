import express from "express";
import { resgistrarUsuario } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/registro", resgistrarUsuario);

export default router;
