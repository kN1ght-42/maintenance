import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

export const requestId = (req: Request, res: Response, next: NextFunction) => {
  const id = randomUUID();

  res.setHeader("X-Request-Id", id);

  res.locals.requestId = id;

  next();
};
