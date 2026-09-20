import type { NextFunction, Request, Response } from "express";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return res.status(400).json({
      error: "Invalid id",
    });
  }

  next();
};
