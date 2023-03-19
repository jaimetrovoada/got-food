import express from "express";
import models from "../model";
import User from "../model/user";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await models.User.find({ role: ["customer", "business"] });

  res.json(users);
});

router.post("/", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  // TODO: add verification w/ zod

  try {
    const user = new User({
      name,
      email,
      password,
      role,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log({ err });
    res.status(500).json({ message: err.message });
  }
});

// TODO: add put request for updating user info

export default router;
