import { connectDB } from "../db/database.js";
import { v4 as uuidv4 } from "uuid";

export const crearGift = async (data) => {
  const db = await connectDB();

  // Validar fecha de expiración mayor a hoy
  const hoy = new Date();
  if (new Date(data.expiration_date) <= hoy) {
    // throw new Error("La fecha de expiración debe ser mayor a la fecha actual");
  }

  const giftcard = { uuid: uuidv4(), ...data };

  await db.run(
    `INSERT INTO giftcards (id, name, amount, currency, expiration_date, user_id)
      VALUES ($id, $name, $amount, $currency, $expiration_date, $user_id)`,
    {
      $id: giftcard.uuid,
      $name: giftcard.name,
      $amount: giftcard.amount,
      $currency: giftcard.currency,
      $expiration_date: giftcard.expiration_date,
      $user_id: giftcard.user_id,
    }
  );

  db.close();

  return { success: true, giftcard };
};

export const getAllGiftcardsByUser = async (userId, idSource, estado, name) => {
  const db = await connectDB();

  let condicion = "";
  let condicion1 = "";

  if (idSource) {
    condicion = ` AND id <> '${idSource}' `;
  }

  if (estado) {
    if (estado != "todo") {
      if (condicion1 == "") {
        condicion1 = ` WHERE `;
      } else {
        condicion1 = ` AND `;
      }

      if (estado == "transferir") {
        condicion1 += `mostrar = 1 `;
      }

      if (estado == "expirado") {
        condicion1 += `mostrar = 0 `;
      } else if (estado == "por_expirar") {
        condicion1 += `a_tiempo = 0 `;
      } else if (estado == "a_tiempo") {
        condicion1 += `mostrar = 1 `;
      }
    }
  }

  if (name) {
    if (condicion1 == "") {
      condicion1 = ` WHERE `;
    } else {
      condicion1 = +` AND `;
    }

    condicion1 += ` UPPER(name) LIKE UPPER('%${name}%') `;
  }

  const giftcards = await db.all(`
    WITH giftcard AS (
      SELECT id, name, amount, currency, strftime('%Y-%m-%d', expiration_date) expiration_date, user_id,
        CASE
          WHEN strftime('%Y-%m-%d', expiration_date) > CURRENT_DATE THEN false
          ELSE true
        END AS expired,
        CASE
          WHEN strftime('%Y-%m-%d', expiration_date) BETWEEN date('now') AND date('now', '+7 days') THEN false
          WHEN strftime('%Y-%m-%d', expiration_date) > CURRENT_DATE THEN true
          -- ELSE true
        END AS a_tiempo
      FROM giftcards 
      WHERE user_id = '${userId}' ${condicion}
    ), numero_gift AS (
      SELECT COUNT(*) AS total FROM giftcard
    )
    SELECT id, name, amount, currency, expiration_date, user_id, expired,
      a_tiempo,
      CASE 
        WHEN expired IS TRUE THEN FALSE
        WHEN num.total > 1 THEN TRUE
        ELSE FALSE
      END mostrar
    FROM giftcard gif
    CROSS JOIN numero_gift num
    ${condicion1}
  `);

  const result = giftcards.map((g) => ({
    ...g,
    expired: Boolean(g.expired),
    a_tiempo: Boolean(g.a_tiempo),
    mostrar: Boolean(g.mostrar),
  }));

  db.close();
  return result;
};

export const getGiftByIdAndUser = async (id, userId) => {
  const db = await connectDB();
  const giftcard = await db.get(
    `SELECT id, name, amount, currency, strftime('%Y-%m-%d', expiration_date) expiration_date, user_id
    FROM giftcards 
    WHERE id = $id AND user_id = $user_id
    ORDER BY name ASC`,
    {
      $id: id,
      $user_id: userId,
    }
  );

  db.close();
  return giftcard;
};

export const getGiftById = async (id) => {
  const db = await connectDB();
  const giftcard = await db.get(
    `SELECT id, name, amount, currency, expiration_date, user_id 
    FROM giftcards 
    WHERE id = $id`,
    {
      $id: id,
    }
  );

  db.close();
  return giftcard;
};

export const actualizarGift = async (id, data) => {
  const db = await connectDB();

  const giftcard = await getGiftById(id);

  if (!giftcard) {
    throw new Error("NO SE HA ENCONTRADO GIFTCARD");
  }

  giftcard.amount = data.amount;

  if (data.expiration_date) {
    giftcard.expiration_date = data.expiration_date;
  }

  await db.run(
    `UPDATE giftcards 
    SET name = $name, amount = $amount, expiration_date = $expiration_date
    WHERE id = $id`,
    {
      $id: id,
      $name: data.name,
      $amount: data.amount,
      $expiration_date: data.expiration_date,
    }
  );

  db.close();

  return giftcard;
};

export const eliminarGift = async (id) => {
  const db = await connectDB();
  const giftcard = await getGiftById(id);

  if (!giftcard) {
    throw new Error("NO SE HA ENCONTRADO GIFTCARD");
  }

  await db.run(`DELETE FROM giftcards WHERE id = $id`, {
    $id: id,
  });

  db.close();

  return {
    success: true,
  };
};

export const transferirAmountGift = async (userId, data) => {
  const db = await connectDB();

  // VALIDACION DE GIFTCARDS
  const giftSalida = await getGiftByIdAndUser(data.sourceCardId, userId);

  if (!giftSalida) {
    throw new Error("NO SE HA ENCONTRADO GIFTCARD SALIDA");
  }

  const giftDestino = await getGiftByIdAndUser(data.destinationCardId, userId);

  if (!giftDestino) {
    throw new Error("NO SE HA ENCONTRADO GIFTCARD DE DESTINO");
  }

  // VALIDACION DE SALDO GIFT SALIDA
  if (giftSalida.amount < data.amount) {
    throw new Error("LA GIFTCARD NO TIENE SALDO SUFICIENTE");
  }

  // VALIDACION DE SALDO POSITIVO
  if (data.amount <= 0) {
    throw new Error("EL MONTO DEBE SER MAYOR A CERO");
  }

  giftSalida.amount = giftSalida.amount - data.amount;
  await db.run(`UPDATE giftcards SET amount = $amount WHERE id = $id`, {
    $id: data.sourceCardId,
    $amount: giftSalida.amount,
  });

  giftDestino.amount = giftDestino.amount + data.amount;
  await db.run(`UPDATE giftcards SET amount = $amount WHERE id = $id`, {
    $id: data.destinationCardId,
    $amount: giftDestino.amount,
  });

  db.close();

  return {
    success: true,
    giftcards: [giftSalida, giftDestino],
  };
};
