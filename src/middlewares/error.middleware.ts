import type { NextFunction, Request, Response } from "express";

interface AppError extends Error {
  statusCode: number;
  code: string;
  details?: unknown;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_SERVER_ERROR";
  const message = err.message || "Внутренняя ошибка сервера";

  return res.status(statusCode).json({
    error: {
      code,
      message,
      details: err.details,
    },
  });
};
