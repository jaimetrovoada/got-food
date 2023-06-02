import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { registerRequestValidator } from "../../shared/schemas";
import { hashPassword } from "../lib/helpers";
import { LoginSchema } from "../lib/schemas";
import * as userService from "../lib/userServices";
import config from "../utils/config";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.get(req.params.id);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
};

export const getUserRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const restaurants = await userService.getRestaurants(id);

    return res.json(restaurants);
  } catch (error) {
    return next(error);
  }
};

export const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const orders = await userService.getOrders(id);

    return res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedUser = registerRequestValidator.parse(req.body);

    const passwordHash = await hashPassword(validatedUser.password);

    const user = await userService.create({
      name: validatedUser.name,
      email: validatedUser.email,
      passwordHash: passwordHash,
      role: validatedUser.role,
    });

    return res.status(201).json(user);
  } catch (err) {
    return next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedUser = LoginSchema.parse({
      email: req.body.email,
      password: req.body.password,
    });

    const user = await userService.getUserWithPassword(validatedUser.email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(
      validatedUser.password,
      user.passwordHash
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, config.JWT_SECRET);

    delete user.passwordHash;

    return res.status(200).json({ token, user });
  } catch (err) {
    return next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  try {
    const updateBody: {
      name?: string;
      email?: string;
      password?: string;
      role?: "business" | "customer";
    } = {
      name: req.body?.name,
      email: req.body?.email,
      password: req.body?.password,
      role: req.body?.role,
    };
    const updatedUser = await userService.update(userId, updateBody);

    return res.status(200).json(updatedUser);
  } catch (err) {
    return next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  try {
    await userService.remove(userId);
    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};
