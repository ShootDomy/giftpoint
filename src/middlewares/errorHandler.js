import { ApiError } from "../utils/apiError.js";

export const errorHandler = (err, req, res, next) => {
  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: "Error de validación",
      errors: err.errors,
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err.details,
    });
  }

  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
};
