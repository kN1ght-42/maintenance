import express, { type Express } from "express";

import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import router from "./routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { config } from "./config.js";
import { requestId } from "./middlewares/request-id.middleware.js";
import { requestLogger } from "./middlewares/logging.middleware.js";

const app: Express = express();

app.use(helmet());

app.use(
  cors({
    origin: config.corsOrigins,
  }),
);

app.use(
  express.json({
    limit: "100kb",
  }),
);

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  limit: config.rateLimit.max,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(limiter);

app.use(requestId);
app.use(requestLogger);

app.use("/api", router);

app.use(errorHandler);

export default app;
