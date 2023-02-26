import { Router } from "express";
import roomController from "../controllers/room.controllers";
import { isAdmin } from "../middleware/auth2";

const roomRouter = Router();

roomRouter.post("/", isAdmin, roomController.create);

roomRouter.get("/", roomController.find);

roomRouter.get("/:id", roomController.findById);

roomRouter.put("/:id", isAdmin, roomController.update);

roomRouter.delete("/:id", isAdmin, roomController.delete);

export default roomRouter;

