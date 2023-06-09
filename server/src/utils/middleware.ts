import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../model/user";
import logger from "./logger";
import { ZodError } from "zod";
import config from "./config";
import { AppDataSource } from "../data-source";
import { EntityNotFoundError, QueryFailedError } from "typeorm";

const userRepository = AppDataSource.getRepository(User);
const userExtractor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userToken = req.headers.authorization.split(" ")[1];

  if (!userToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(userToken, config.JWT_SECRET) as {
      id: string;
      email: string;
      role: string;
    };

    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await userRepository.findOneBy({
      id: decoded.id,
    });

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  logger.error({
    message: `${req.method} ${req.url}`,
    body: req.body,
    error: { error },
  });

  if (error instanceof ZodError) {
    const messages = error.errors.map((err) => err.message);
    return res.status(400).send({ error: messages });
  }

  if (error instanceof QueryFailedError) {
    return res.status(500).json({ error: error.message });
  }

  if (error instanceof EntityNotFoundError) {
    return res.status(404).json({ error: error.message });
  }

  return res.status(500).json(error);
};

export default { userExtractor, unknownEndpoint, errorHandler };
