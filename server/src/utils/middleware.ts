import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import model from "../model";

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
    const decoded = jwt.verify(userToken, process.env.JWT_SECRET) as {
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

export default { userExtractor };
