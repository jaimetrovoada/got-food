import express from "express";
import models from "../model";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const restaurants = await models.Restaurant.find({})
      .populate("owner", {
        name: 1,
        email: 1,
      })
      .populate("menuItems");

    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const restaurant = await models.Restaurant.findById(req.params.id).populate(
      "owner",
      {
        name: 1,
        email: 1,
      }
    );

    res.json(restaurant);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
});

router.get("/:id/menu", async (req, res) => {
  try {
    const menu = await models.Menu.find({ restaurant: req.params.id });

    // group menu by category
    const groupedMenu = menu.reduce((acc, curr) => {
      const key = curr.category;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    });

    res.json(groupedMenu);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
});

router.post("/", async (req, res) => {
  try {
    const restaurant = await models.Restaurant.create({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      menu: req.body.menu,
      owner: req.body.owner,
    });

    // TODO: handle file upload

    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
});

router.post("/:id/menu", async (req, res) => {
  try {
    const menuItem = new models.Menu({
      restaurant: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    });
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
});

// TODO: add put request for updating restaurant info

export default router;
