import { Express } from "express";
import roomTypeRouter from "./roomType.route";
import roomRouter from "./room.route";
import authRouter from "./auth.routes";

const basePath = "/api/v1";

export default (app: Express) => {
  app.use(`${basePath}`, authRouter);
  app.use(`${basePath}/rooms`, roomRouter);
  app.use(`${basePath}/room-types`, roomTypeRouter);
};

