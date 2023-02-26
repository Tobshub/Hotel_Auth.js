import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema(
  {
    codeName: {
      type: String,
      required: [true, "Please enter a code name for room type"],
      minlength: 3,
      maxlength: 100,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

roomTypeSchema.set("toJSON", {
  versionKey: false,

  transform(doc, ret) {
    delete ret.__v;
  },
});

const RoomType = mongoose.model("RoomType", roomTypeSchema);

export default RoomType;

