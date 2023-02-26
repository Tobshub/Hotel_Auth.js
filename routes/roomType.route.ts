import { Router } from "express";
import roomTypeController from "../controllers/roomType.controllers";
import { isAdmin } from "../middleware/auth2";

const roomTypeRouter = Router();

roomTypeRouter.post("/", isAdmin, roomTypeController.create);
roomTypeRouter.get("/:id", roomTypeController.findById);

roomTypeRouter.get("/", roomTypeController.findAll);

roomTypeRouter.put("/:id", isAdmin, roomTypeController.update);

roomTypeRouter.delete("/:id", isAdmin, roomTypeController.delete);

export default roomTypeRouter;

