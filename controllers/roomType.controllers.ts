import { Request, Response } from "express";
import roomTypeService from "../services/roomType.services";
import { BadRequestError } from "../errors";

import { roomTypeSchema } from "../middleware/validate";

class RoomTypeController {
  async create(req: Request, res: Response) {
    try {
      // const validate = await roomTypeSchema.validateAsync({ ...req.body });

      const roomType = await roomTypeService.findOne({
        codeName: req.body.codeName,
      });

      //if RoomTypeExist
      if (roomType) {
        return res.status(400).send({
          success: false,
          message: "Room already exists",
        });
      }

      const newRoomType = await roomTypeService.create(req.body);

      return res.status(201).send({
        success: true,
        message: "created room type",
        data: newRoomType,
      });
    } catch (err) {
      throw new BadRequestError(err as string);
      // throw new BadRequestError(err?.details[0]?.message);
    }
  }

  // Find One
  async findById(req: Request, res: Response) {
    const roomType = await roomTypeService.findById(req.params.id);

    if (!roomType) {
      return res.status(404).send({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Room type found",
      data: roomType,
    });
  }

  async findAll(req: Request, res: Response) {
    const roomType = await roomTypeService.findAll({});

    if (!roomType) {
      return res.status(404).send({
        success: false,
        message: "Room not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Room type found",
      data: roomType,
    });
  }

  async update(req: Request, res: Response) {
    const roomType = await roomTypeService.update(req.params.id, req.body);
    if (!roomType) {
      return res.status(404).send({
        success: false,
        message: "Room not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Room type updated successfully",
      data: roomType,
    });
  }

  async delete(req: Request, res: Response) {
    const roomType = await roomTypeService.delete(req.params.id);

    return res.status(200).send({
      success: true,
      message: "Room type deleted successfully",
    });
  }
}

export default new RoomTypeController();

