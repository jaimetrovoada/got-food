import { Request } from "express";
import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "customer" | "business";
  restaurants?: mongoose.Types.ObjectId[];
}

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
