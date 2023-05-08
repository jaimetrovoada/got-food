import express from "express";
import models from "../model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import { Register, Login, Update } from "../lib/schemas";
import middleware from "../utils/middleware";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const user = await models.User.findById(req.params.id).populate(
    "restaurants",
    {
      name: 1,
    }
  );
  res.json(user);
});

router.get("/:id/restaurants", async (req, res) => {
  const id = req.params.id;
  const user = await models.User.findById(id).populate("restaurants", {
    name: 1,
  });
  const restaurants = user.restaurants;

  res.json(restaurants);
});

router.get("/:id/orders", async (req, res) => {
  const id = req.params.id;
  const user = await models.User.findById(id).populate({
    path: "orders",
    populate: [
      {
        path: "orderedItems",
        populate: {
          path: "item",
        },
      },
      {
        path: "restaurant",
        select: {
          name: 1,
        },
      },
    ],
    select: {
      restaurant: 1,
      totalPrice: 1,
      items: 1,
      date: 1,
      tableNumber: 1,
      status: 1,
    },
  });
  const orders = user.orders;

  res.json(orders);
});

router.post("/register", async (req, res, next) => {
  try {
    const validatedUser = Register.parse({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(validatedUser.password, saltRounds);

    const user = new models.User({
      name: validatedUser.name,
      email: validatedUser.email,
      passwordHash,
      role: validatedUser.role,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const validatedUser = Login.parse({
      email: req.body.email,
      password: req.body.password,
    });

    const user = await models.User.findOne({ email: validatedUser.email });

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
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, config.JWT_SECRET);

    res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", middleware.userExtractor, async (req, res, next) => {
  const userId = req.params.id;
  try {
    const validatedUser = Update.parse({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    const user = await models.User.findById(userId);
    const saltRounds = 10;
    const passwordHash = validatedUser.password
      ? await bcrypt.hash(validatedUser.password, saltRounds)
      : user.passwordHash;

    user.name = validatedUser.name;
    user.email = validatedUser.email;
    user.passwordHash = passwordHash;
    user.role = validatedUser.role;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

export default router;
