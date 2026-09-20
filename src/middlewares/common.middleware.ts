import { appError } from "../utils/appError.js";
import type { NextFunction, Request, Response } from "express";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return next(
      appError(400, "VALIDATION_ERROR", "Некорректные данные запроса", [
        {
          field: "id",
          message: "Некорректный идентификатор",
        },
      ]),
    );
  }

  next();
};
