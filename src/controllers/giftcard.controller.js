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

export const crearGiftcard = async (req, res, next) => {
  const { amount, currency, expiration_date, user_id } = req.body;

  // Validar campos requeridos
  if (!amount || !currency || !expiration_date || !user_id) {
    return res
      .status(400)
      .json({ success: false, message: "faltan campos requeridos" });
  }

  // Validar monto positivo
  if (typeof amount !== "number" || amount <= 0) {
    return res
      .status(400)
      .json({ success: false, message: "El monto debe ser positivo" });
  }

  // Validar formato de fecha (YYYY-MM-DD)
  const fechaExp = new Date(expiration_date);
  const formattedDate = fechaExp.toISOString().split("T")[0];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(formattedDate)) {
    return res
      .status(400)
      .json({ success: false, message: "Formato de fecha inválido" });
  }

  // Validar código de moneda (3 letras)
  if (!/^[A-Z]{3}$/.test(currency)) {
    return res
      .status(400)
      .json({ success: false, message: "Código de moneda inválido" });
  }

  // Validar UUID
  if (!isUUID(user_id)) {
    return res
      .status(400)
      .json({ success: false, message: "user_id debe ser un UUID válido" });
  }

  try {
    const giftcard = await crearGift(req.body);

    res.status(201).json({
      success: true,
      message: "Giftcard creada exitosamente",
      data: giftcard,
    });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const getGiftcardsByUser = async (req, res, next) => {
  const { idSource, estado, name, moneda, page, size } = req.query;
  // console.log("idSource", idSource);

  // Validar UUID
  if (!isUUID(req.params.id)) {
    return res
      .status(400)
      .json({ success: false, message: "user_id debe ser un UUID válido" });
  }

  if (idSource) {
    if (!isUUID(idSource)) {
      return res
        .status(400)
        .json(
          { success: false, message: "user_id debe ser un UUID válido" },
          {}
        );
    }
  }

  try {
    const giftcards = await getAllGiftcardsByUser(
      req.params.id,
      idSource,
      estado,
      name,
      moneda,
      page,
      size
    );

    res.json(giftcards);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const getGiftcardByIdAndUser = async (req, res, next) => {
  try {
    const { id, userId } = req.params;
    if (!id || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Faltan parámetros (id o userId)" });
    }

    const giftcard = await getGiftByIdAndUser(id, userId);

    if (!giftcard) {
      return res
        .status(404)
        .json({ success: false, message: "Giftcard no encontrada" });
    }

    res.json(giftcard);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const actualizarGiftcard = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Falta el parámetro id" });
    }

    const giftcard = await actualizarGift(id, req.body);

    res.status(200).json({
      success: true,
      message: "Giftcard actualizada exitosamente",
      data: giftcard,
    });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const eliminarGiftcard = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Falta el parámetro id" });
    }

    const giftcard = await eliminarGift(id);

    res.status(200).json(giftcard);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

export const transferirAmountGiftcard = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { sourceCardId, destinationCardId, amount } = req.body;

    if (!userId || !sourceCardId || !destinationCardId || !amount) {
      return res.status(400).json({
        success: false,
        message:
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

    res.status(200).json(giftcard);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};
