import Joi from "joi";

export const authSchema = Joi.object({
  name: Joi.string().required().max(50).min(3),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  roles: Joi.string().required().lowercase(),
});

export const roomTypeSchema = Joi.object({
  codeName: Joi.string().required().min(3).max(100),
});

export const roomSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  sizes: Joi.string().required(), // INCOMPLETE
  roomType: Joi.string().required(), // INCOMPLETE
  createdBy: Joi.string().required(), // INCOMPLETE
});

// HELLO???? YOU CAN SPEAK 😀

