import express from "express";
// @ts-ignore
import expressAsyncErrors from "express-async-errors";
import pino from "pino";
import appMiddleware from "./middleware/appMiddleware";

const logger = pino();

const app = express();

appMiddleware(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
});

