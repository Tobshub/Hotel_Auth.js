import RoomType from "../models/roomTypes.models";

class RoomTypeService {
  async create(newRoomTypeData: any) {
    const newRoomType = await RoomType.create(newRoomTypeData);

    return newRoomType;
  }

  async findOne(filter: any) {
    const roomType = await RoomType.findOne(filter);

    return roomType;
  }

  async findById(id: string) {
    const roomType = await RoomType.findById(id);

    return roomType;
  }

  async findAll(filter = {}) {
    const roomTypes = await RoomType.find(filter);

    return roomTypes;
  }

  async update(id: string, updateData = {}) {
    const roomType = await RoomType.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
    });

    return roomType;
  }

  async delete(id: string) {
    const roomType = await RoomType.findByIdAndRemove(id);
    return roomType;
  }
}

export default new RoomTypeService();

