import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { Request, Response } from "express";
import { HydratedDocument, LeanDocument } from "mongoose";

// const { authSchema } = require("../middleware/validate");

export const register = async (req: Request, res: Response) => {
  try {
    // const validate = await authSchema.validateAsync({ ...req.body });

    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "User created successfully",
      user: { userId: user._id, name: user.name, role: user.roles },
    });
  } catch (err) {
    throw new BadRequestError(err as string);
    // throw new BadRequestError(err?.details[0]?.message);
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({
    status: true,
    message: "User logged in successfully",
    user: { userId: user._id, name: user.name, role: user.roles },
    token,
  });
};

