import { Express, json, urlencoded } from "express";
import morgan from "morgan";

// extra security packages
import helmet from "helmet";
import cors from "cors";
//@ts-ignore
import xss from "xss-clean";

import asyncError from "./errors.middleware";

// const roomTypesRouter = require("./roomType.route");
// const roomRouter = require("./room.route");
// const authRouter = require("./auth.routes");
import indexRoutes from "../routes/app.routes";
// const authenticateUser = require("./authentication");

// error handler
import notFoundMiddleware from "./not-found";
import errorHandlerMiddleware from "./error-handler";

import database from "../config/database";
database();

export default (app: Express) => {
  app.use(morgan("dev"));
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cors());
  app.use(xss());
  indexRoutes(app);
  // app.use("/api/v1/", authenticateUser, roomRouter, roomTypesRouter);
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);
  app.use(asyncError);
};

