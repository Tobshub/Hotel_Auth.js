import { Request, Response } from "express";
import pino from "pino";
const logger = pino();

export default (error: any, req: Request, res: Response, next: (...args: any) => any) => {
  logger.error(error);

  return res.status(500).send({
    success: false,
    message: error.message,
  });
};

