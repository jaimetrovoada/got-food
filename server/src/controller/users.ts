import express from "express";
import models from "../model";
import bcrypt from "bcrypt";
import { z } from "zod";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await models.User.find({ role: ["customer", "business"] });

  res.json(users);
});

router.post("/", async (req, res) => {
  const User = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    role: z.enum(["customer", "business"]),
  });

  try {
    const validatedUser = User.parse({
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
    console.log({ err });
    res.status(500).json({ error: err });
  }
});

// TODO: add put request for updating user info

export default router;
