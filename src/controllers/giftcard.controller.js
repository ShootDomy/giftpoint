import {
  crearGift,
  getAllGiftcardsByUser,
  getGiftByIdAndUser,
  actualizarGift,
  eliminarGift,
} from "../services/giftcard.service.js";

export const crearGiftcard = async (req, res) => {
  try {
    const giftcard = await crearGift(req.body);

    console.log("giftcard", giftcard);
    res.status(201).json(giftcard);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error.message });
  }
};

export const getGiftcardsByUser = async (req, res) => {
  try {
    const giftcards = await getAllGiftcardsByUser(req.params.id);
    res.json(giftcards);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error.message });
  }
};

export const getGiftcardByIdAndUser = async (req, res) => {
  try {
    const { id, userId } = req.params;
    if (!id || !userId) {
      return res.status(400).json({ error: "Faltan parámetros (id o userId)" });
    }

    const giftcard = await getGiftByIdAndUser(id, userId);

    if (!giftcard) {
      return res.status(404).json({ error: "Giftcard no encontrada" });
    }

    res.json(giftcard);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error.message });
  }
};

export const actualizarGiftcard = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Falta el parámetro id" });
    }

    const giftcard = await actualizarGift(id, req.body);

    res.json(giftcard);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error.message });
  }
};

export const eliminarGiftcard = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Falta el parámetro id" });
    }

    const giftcard = await eliminarGift(id);

    res.json(giftcard);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error.message });
  }
};
