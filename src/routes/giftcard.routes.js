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
import { validateSchema } from "../middlewares/validateSchema.js";
import {
  actualizarGiftcardSchema,
  createGiftcardSchema,
  transferirAmountGiftcardSchema,
} from "../schemas/giftcardSchema.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  validateSchema(createGiftcardSchema),
  crearGiftcard
);
router.get("/:id", verifyToken, getGiftcardsByUser);
router.get("/:id/:userId", verifyToken, getGiftcardByIdAndUser);
router.put(
  "/:id",
  verifyToken,
  validateSchema(actualizarGiftcardSchema),
  actualizarGiftcard
);
router.delete("/:id", verifyToken, eliminarGiftcard);
router.post(
  "/transfer/:userId",
  verifyToken,
  validateSchema(transferirAmountGiftcardSchema),
  transferirAmountGiftcard
);

export default router;
