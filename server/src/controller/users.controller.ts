import { Request, Response, NextFunction } from "express";
import { User } from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import { RegisterSchema, LoginSchema, UpdateSchema } from "../lib/schemas";
import { AppDataSource } from "../data-source";

const userRepository = AppDataSource.getRepository(User);

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await userRepository.findOneBy({
    id: req.params.id,
  });
  res.json(user);
};

export const getUserRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const user = await userRepository.findOne({
      where: {
        id: id,
      },
      relations: ["restaurants"],
    });
    const restaurants = user.restaurants;

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
  const id = req.params.id;
  const user = await userRepository.findOneBy({ id: id });
  const orders = user.orders;

  res.json(orders);
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedUser = RegisterSchema.parse({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(validatedUser.password, saltRounds);

    const user = new User();

    user.name = validatedUser.name;
    user.email = validatedUser.email;
    user.passwordHash = passwordHash;
    user.role = validatedUser.role;

    const newUser = await userRepository.save(user);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
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

    const user = await userRepository
      .createQueryBuilder("user")
      .where("user.email = :email", { email: validatedUser.email })
      .addSelect("user.passwordHash")
      .getOne();

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

    res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  try {
    const validatedUser = UpdateSchema.parse({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    const user = await userRepository.findOneBy({ id: userId });
    const saltRounds = 10;
    const passwordHash = validatedUser.password
      ? await bcrypt.hash(validatedUser.password, saltRounds)
      : user.passwordHash;

    user.name = validatedUser.name;
    user.email = validatedUser.email;
    user.passwordHash = passwordHash;
    user.role = validatedUser.role;

    const updatedUser = await userRepository.save(user);

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
