import express from "express";
import {
  actualizarGiftcard,
  crearGiftcard,
  eliminarGiftcard,
  getGiftcardByIdAndUser,
  getGiftcardsByUser,
  transferirAmountGiftcard,
} from "../controllers/giftcard.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, crearGiftcard);
router.get("/:id", verifyToken, getGiftcardsByUser);
router.get("/:id/:userId", verifyToken, getGiftcardByIdAndUser);
router.put("/:id", verifyToken, actualizarGiftcard);
router.delete("/:id", verifyToken, eliminarGiftcard);
router.post("/transfer/:userId", verifyToken, transferirAmountGiftcard);

export default router;
