import express, { type Express } from "express";
import router from "./routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app: Express = express();

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

export default app;
