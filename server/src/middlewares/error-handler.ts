import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";
import { IPostgresError } from "../interfaces/IPostgresError";

// Middleware para capturar erros
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
      errors: err.flatten().fieldErrors,
    });
  }

  const dbError = err.cause as IPostgresError;
  if (dbError) {
    switch (dbError.code) {
      case "23505":
        return res.status(409).json({
          status: "error",
          message: "Duplicated Register",
        });
      case "23502":
        return res.status(400).json({
          status: "error",
          message: "Mandatory field is missing",
        });
      case "23503":
        return res.status(400).json({
          status: "error",
          message: "Invalid reference",
        });
    }
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}
