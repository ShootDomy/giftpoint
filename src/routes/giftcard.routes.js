import express from "express";
import {
  actualizarGiftcard,
  crearGiftcard,
  eliminarGiftcard,
  getGiftcardByIdAndUser,
  getGiftcardsByUser,
} from "../controllers/giftcard.controller.js";

const router = express.Router();

router.post("/", crearGiftcard);
router.get("/:id", getGiftcardsByUser);
router.get("/:id/:userId", getGiftcardByIdAndUser);
router.put("/:id", actualizarGiftcard);
router.delete("/:id", eliminarGiftcard);
// router.post("/transferir", transferirAconunt);

export default router;
