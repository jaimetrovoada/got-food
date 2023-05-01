import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import model from "../model";
import logger from "./logger";
import { ZodError } from "zod";
import config from "./config";

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

    const user = await model.User.findById(decoded.id);

    req.user = user;

    next();
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
  } else if (error.name === "ValidationError") {
    return res.status(409).send({ error: "Email already exists" });
  }

  next(error);
};

export default { userExtractor, unknownEndpoint, errorHandler };
