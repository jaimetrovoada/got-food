import express, { NextFunction, Request, Response } from "express";
import models from "../model";
import multer from "multer";
import { z } from "zod";
import middleware from "../utils/middleware";
import { bucket } from "../app";
import { nanoid } from "nanoid/async";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const MenuItem = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  image: z.string().url(),
});

const Restaurant = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  menuItems: z.array(MenuItem).optional(),
  logo: z.string().url(),
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
  middleware.userExtractor,
  upload.single("logo"),
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    try {
      const id = await nanoid();
      const imgname = id + "." + req.file.mimetype.split("/")[1];
      const file = bucket.file(imgname);

      file.createWriteStream().end(req.file.buffer);
      const firebaseImgUrl = await file.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });

      const vRestaurant = Restaurant.parse({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        menuItems: req.body.menuItems || [],
        logo: firebaseImgUrl[0],
      });

      const restaurant = new models.Restaurant({
        ...vRestaurant,
        owner: user._id,
      });

      const result = await restaurant.save();
      user.restaurants = user.restaurants.concat(result._id);
      await user.save();

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/:id/menu", upload.single("image"), async (req, res) => {
  try {
    const id = await nanoid();
    const imgname = id + "." + req.file.mimetype.split("/")[1];
    const file = bucket.file(imgname);

    file.createWriteStream().end(req.file.buffer);
    const firebaseImgUrl = await file.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });
    const priceSchema = z.coerce.number();
    const vMenuItem = MenuItem.parse({
      restaurant: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: priceSchema.parse(req.body.price),
      category: req.body.category,
      image: firebaseImgUrl[0],
    });

    const restaurant = await models.Restaurant.findById(req.params.id);
    const menuItem = new models.Menu({
      ...vMenuItem,
      restaurant: restaurant._id,
    });

    const result = await menuItem.save();
    restaurant.menuItems = restaurant.menuItems.concat(result._id);
    await restaurant.save();
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
  async (req, res) => {
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
