import type { NextFunction, Request, Response } from "express";

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    console.log(
      JSON.stringify({
        level: "info",
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        duration: `${duration}ms`,
        requestId: res.locals.requestId,
      }),
    );
  });

  next();
};
