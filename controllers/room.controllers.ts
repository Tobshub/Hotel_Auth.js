import _ from "lodash";
import { Request, Response } from "express";
import roomService from "../services/room.service";

class RoomController {
  async create(req: Request, res: Response) {
    const newRoom = await roomService.create(req.body);

    return res.status(201).send({
      success: true,
      message: "Room created successfully",
      data: newRoom,
    });
  }

  async find(req: Request, res: Response) {
    //When you want to make a search
    if (!_.isEmpty(req?.query)) {
      const searchedResult = await roomService.search(req.query);
      return res.status(200).send({
        success: true,
        message: "Rooms search successfully",
        data: searchedResult,
      });
    }

    const rooms = await roomService.find();

    if (_.isEmpty(rooms)) {
      return res.status(404).send({
        success: false,
        message: "Room not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Rooms found successfully",
      data: rooms,
    });
  }

  async findById(req: Request, res: Response) {
    const room = await roomService.findById(req.params.id);

    if (!room) {
      return res.status(404).send({
        success: false,
        message: "Room not Found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Room found successfully",
      data: room,
    });
  }

  async update(req: Request, res: Response) {
    const room = await roomService.update(req.params.id, req.body);

    return res.status(200).send({
      success: true,
      message: "Room updated successfully",
      data: room,
    });
  }

  async delete(req: Request, res: Response) {
    const room = await roomService.delete(req.params.id);

    return res.status(200).send({
      success: true,
      message: "deleted room successfully",
      data: room,
    });
  }
}

export default new RoomController();

