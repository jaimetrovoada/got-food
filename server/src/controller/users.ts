import express from "express";
import models from "../model";

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
    const user = await models.User.create({
      name,
      email,
      password,
      role,
    });
    res.json(user);
  } catch (err) {
    console.log({ err });
  }
});

// TODO: add put request for updating user info

export default router;
