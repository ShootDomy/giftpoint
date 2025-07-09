import z from "zod";

export const createGiftcardSchema = z.object({
  name: z
    .string()
    .nonempty("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  amount: z
    .number()
    .min(1, "El monto debe ser mayor a cero")
    .max(1000000, "El monto no puede ser mayor a 1.000.000"),
  currency: z
    .string()
    .nonempty("La moneda es obligatoria")
    .min(3, "La moneda debe tener al menos 3 caracteres"),
  expiration_date: z
    .string()
    .nonempty("La fecha de expiración es obligatoria")
    .min(10, "La fecha de expiración debe tener al menos 10 caracteres"),
  user_id: z.string().uuid("El user_id es obligatorio"),
});

export const actualizarGiftcardSchema = z.object({
  name: z
    .string()
    .nonempty("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  amount: z
    .number()
    .min(1, "El monto debe ser mayor a cero")
    .max(1000000, "El monto no puede ser mayor a 1.000.000"),
  expiration_date: z
    .string()
    .nonempty("La fecha de expiración es obligatoria")
    .min(10, "La fecha de expiración debe tener al menos 10 caracteres"),
});

export const transferirAmountGiftcardSchema = z.object({
  sourceCardId: z.string().uuid("El sourceCardId es obligatorio"),
  destinationCardId: z.string().uuid("El destinationCardId es obligatorio"),
  amount: z
    .number()
    .min(1, "El monto debe ser mayor a cero")
    .max(1000000, "El monto no puede ser mayor a 1.000.000"),
});
