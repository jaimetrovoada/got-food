import express from "express";
import models from "../model";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await models.User.find({ role: ["customer", "business"] });

  res.json(users);
});

router.post("/", async (req, res) => {
  const reqUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(reqUser.password, saltRounds);

  try {
    const user = new models.User({
      name: reqUser.name,
      email: reqUser.email,
      passwordHash,
      role: reqUser.role,
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
