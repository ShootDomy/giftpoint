import {
  crearGift,
  getAllGiftcardsByUser,
  getGiftByIdAndUser,
  eliminarGift,
  actualizarGift,
  transferirAmountGift,
} from "../services/giftcard.service.js";

const isUUID = (str) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

export const crearGiftcard = async (req, res) => {
  const { amount, currency, expiration_date, user_id } = req.body;

  // Validar campos requeridos
  if (!amount || !currency || !expiration_date || !user_id) {
    return res.status(400).json({ error: "faltan campos requeridos" });
  }

  // Validar monto positivo
  if (typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "El monto debe ser positivo" });
  }

  // Validar formato de fecha (YYYY-MM-DD)
  const fechaExp = new Date(expiration_date);
  const formattedDate = fechaExp.toISOString().split("T")[0];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
    return res.status(400).json({ error: "Formato de fecha inválido" });
  }

  // Validar código de moneda (3 letras)
  if (!/^[A-Z]{3}$/.test(currency)) {
    return res.status(400).json({ error: "Código de moneda inválido" });
  }

  // Validar UUID
  if (!isUUID(user_id)) {
    return res.status(400).json({ error: "user_id debe ser un UUID válido" });
  }

  try {
    const giftcard = await crearGift(req.body);

    // console.log("giftcard", giftcard);
    res.status(201).json(giftcard);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error.message });
  }
};

export const getGiftcardsByUser = async (req, res) => {
  const { idSource, estado, name, paginaActual, items } = req.query;
  // console.log("idSource", idSource);

  // Validar UUID
  if (!isUUID(req.params.id)) {
    return res.status(400).json({ error: "user_id debe ser un UUID válido" });
  }

  if (idSource) {
    if (!isUUID(idSource)) {
      return res.status(400).json({ error: "user_id debe ser un UUID válido" });
    }
  }

  try {
    const giftcards = await getAllGiftcardsByUser(
      req.params.id,
      idSource,
      estado,
      name,
      paginaActual,
      items
    );
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

export const transferirAmountGiftcard = async (req, res) => {
  try {
    const { userId } = req.params;
    const { sourceCardId, destinationCardId, amount } = req.body;

    if (!userId || !sourceCardId || !destinationCardId || !amount) {
      return res.status(400).json({
        error:
          "Faltan parámetros (userId, sourceCardId, destinationCardId o amount)",
      });
    }

    const data = {
      userId,
      sourceCardId,
      destinationCardId,
      amount,
    };

    const giftcard = await transferirAmountGift(userId, data);

    res.json(giftcard);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error.message });
  }
};
