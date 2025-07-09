import { z } from "zod";

// Esquema de validación para registro
export const createUserSchema = z.object({
  name: z
    .string()
    .nonempty("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z
    .string()
    .nonempty("El email es obligatorio")
    .email("Correo inválido"),
  password: z
    .string()
    .nonempty("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// Esquema de validación para login
export const loginUserSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// Esquema de validación para actualizar usuario
export const updateUserSchema = z.object({
  name: z
    .string()
    .nonempty("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z
    .string()
    .nonempty("El email es obligatorio")
    .email("Correo inválido"),
  // password: z
  //   .string()
  //   .nonempty("La contraseña es obligatoria")
  //   .min(6, "La contraseña debe tener al menos 6 caracteres"),
});
