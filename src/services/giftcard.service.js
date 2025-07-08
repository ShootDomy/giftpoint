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

export const getAllGiftcardsByUser = async (
  userId,
  idSource,
  estado,
  name,
  paginaActual,
  items
) => {
  const db = await connectDB();

  let condicion = "";
  let condicion1 = "";
  let filtros = [];

  if (idSource) {
    condicion = ` AND id <> '${idSource}' `;
  }

  if (estado && estado !== "todo") {
    if (estado === "transferir") filtros.push(`mostrar = 1`);
    else if (estado === "expirado") filtros.push(`mostrar = 0`);
    else if (estado === "por_expirar") filtros.push(`a_tiempo = 0`);
    else if (estado === "a_tiempo") filtros.push(`mostrar = 1`);
  }

  if (name) {
    filtros.push(`UPPER(name) LIKE UPPER('%${name}%')`);
  }

  condicion1 = filtros.length > 0 ? `WHERE ${filtros.join(" AND ")}` : "";

  if (!paginaActual) {
    paginaActual = 1;
  }

  if (!items) {
    items = 4;
  }

  const offset = (paginaActual - 1) * items;

  const giftcards = await db.all(`
    WITH giftcard AS (
      SELECT 
        id, name, amount, currency,
        strftime('%Y-%m-%d', expiration_date) AS expiration_date,
        user_id,
        CASE
          WHEN strftime('%Y-%m-%d', expiration_date) > date('now') THEN 0
          ELSE 1
        END AS expired,
        CASE
          WHEN strftime('%Y-%m-%d', expiration_date) BETWEEN date('now') AND date('now', '+7 days') THEN 0
          WHEN strftime('%Y-%m-%d', expiration_date) > date('now') THEN 1
          ELSE 0
        END AS a_tiempo
      FROM giftcards
      WHERE user_id = '${userId}' ${condicion}
    ),
    numero_gift AS (
      SELECT COUNT(*) AS total FROM giftcard
    ),
    datos AS (
      SELECT 
        gif.id, gif.name, gif.amount, gif.currency,
        gif.expiration_date, gif.user_id,
        gif.expired, gif.a_tiempo,
        CASE 
          WHEN gif.expired = 1 THEN 0
          WHEN num.total > 1 THEN 1
          ELSE 0
        END AS mostrar,
        num.total AS registros
      FROM giftcard gif
      CROSS JOIN numero_gift num
      ${condicion1}
    ),
    paginados AS (
      SELECT * FROM datos
      ORDER BY name ASC
      LIMIT ${items} OFFSET ${offset}
    )
    SELECT 
      *,
      ${paginaActual} AS pagina_actual,
      CASE 
        WHEN (${paginaActual} * ${items}) < registros THEN (${paginaActual} + 1)
        ELSE NULL
      END AS siguiente_pagina
    FROM paginados;
  `);

  // const result = giftcards.map((g) => ({
  //   ...g,
  //   expired: Boolean(g.expired),
  //   a_tiempo: Boolean(g.a_tiempo),
  //   mostrar: Boolean(g.mostrar),
  // }));

  db.close();

  const result = {
    data: giftcards.map((g) => ({
      id: g.id,
      name: g.name,
      amount: g.amount,
      currency: g.currency,
      expiration_date: g.expiration_date,
      user_id: g.user_id,
      expired: Boolean(g.expired),
      a_tiempo: Boolean(g.a_tiempo),
      mostrar: Boolean(g.mostrar),
    })),
    pagination: giftcards[0]
      ? {
          registros: giftcards[0].registros,
          pagina_actual: giftcards[0].pagina_actual,
          siguiente_pagina: giftcards[0].siguiente_pagina,
        }
      : {
          registros: 0,
          pagina_actual: paginaActual,
          siguiente_pagina: null,
        },
  };

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

  if (data.expiration_date || data.expiration_date != "null") {
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
