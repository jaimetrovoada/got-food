import express, { Request } from "express";
import models from "../model";
import multer from "multer";
import { z } from "zod";
import middleware from "../utils/middleware";
import { bucket } from "../app";
import logger from "../utils/logger";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const MenuItem = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  image: z.string(),
  restaurant: z.any(),
});

const Restaurant = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  owner: z.any(),
  menuItems: z.array(MenuItem),
  image: z.string(),
});

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
    const restaurant = await models.Restaurant.findById(req.params.id).populate(
      "menuItems",
      {
        name: 1,
        description: 1,
        price: 1,
        category: 1,
        image: 1,
      }
    );

    const menu = restaurant.menuItems;

    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
});

router.post(
  "/",
  upload.single("logo"),
  middleware.userExtractor,
  async (req: Request, res) => {
    const { user } = req;
    try {
      const vRestaurant = Restaurant.parse({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        owner: user._id,
        menuItems: req.body.menuItems,
        image: req.file.path.split("public").pop(),
      });

      const restaurant = new models.Restaurant(vRestaurant);

      res.status(201).json(restaurant);
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log({ err });
    }
  }
);

router.post("/:id/menu", upload.single("food"), async (req, res) => {
  try {
    const vMenuItem = MenuItem.parse({
      restaurant: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.destination + "/" + req.file.filename,
    });

    const menuItem = new models.Menu(vMenuItem);

    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
});

router.put(
  "/:id",
  upload.single("logo"),
  middleware.userExtractor,
  async (req: Request, res) => {
    const { user } = req;
    try {
      const vRestaurant = Restaurant.parse({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        owner: user._id,
        menuItems: req.body.menuItems,
      });

      const restaurant = await models.Restaurant.findByIdAndUpdate(
        req.params.id,
        vRestaurant
      );

      res.json(restaurant);
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log({ err });
    }
  }
);
export default router;

// TODO: allow multiple file upload
// TODO: add images to different folders according to restaurant
