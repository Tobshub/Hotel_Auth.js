import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Cofirm it is an admin
export const isAdmin = async (req: Request, res: Response, next: (...args: any) => any) => {
  try {
    // Confirm, that the TOKKEN IS IN THE HEADER
    // The token wil  be placed in the authorization header and will have the Bearer prefix, thats why we need to split it and get the token
    if (!req.headers.authorization) {
      return res.status(401).send({
        statuscode: 401,
        status: "error",
        message: "No token provided",
      });
    }
    const token = await req.headers.authorization.split(" ")[1];
    if (token === undefined) {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Token not found in the header",
      });
    }

    const decodedToken = (await jwt.verify(token, process.env.JWT_SECRET as string)) as { userId: string };

    // cofirm that the token is valid
    if (!decodedToken) {
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Token is not valid",
      });
    }

    const adminId = decodedToken.userId;

    // Check if Admin Id Exists in the admin database
    const admin = await User.findById(adminId);

    console.log(admin);

    if (!admin || admin.roles !== "admin") {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Unauthorized Request! You are not allowed to make request to this endpoint",
      });
    } else {
      // @ts-ignore
      req.admin = admin;
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

// Confirm User is logged in
export const isAuthorized = async (req: Request, res: Response, next: (...args: any) => any) => {
  try {
    // Confirm, that the TOKKEN IS IN THE HEADER
    // The token wil  be placed in the authorization header and will have the Bearer prefix, thats why we need to split it and get the token
    if (!req.headers.authorization) {
      return res.status(401).send({
        statuscode: 401,
        status: "error",
        thetoken: `${req.headers.authorization}`,
        message: "No token provided",
      });
    }
    const token = await req.headers.authorization.split(" ")[1];
    if (token === undefined) {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Token not found in the header",
      });
    }

    const decodedToken = (await jwt.verify(token, process.env.JWT_SECRET as string)) as { userId: string };

    // cofirm that the token is valid
    if (!decodedToken) {
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Token is not valid",
      });
    }

    const userId = decodedToken.userId;

    // Check if user id exist in th User database
    const user = await User.findById(userId);

    console.log(user);
    if (!user) {
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Unauthorized Request!",
      });
    } else {
      // @ts-ignore
      req.user = user;
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

