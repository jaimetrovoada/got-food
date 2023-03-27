import express from "express";
import models from "../model";
import multer from "multer";
import { z } from "zod";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "." + file.originalname.split(".").pop());
  },
});
const upload = multer({ storage: storage });

const MenuItem = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  image: z.string(),
});

const Restaurant = z.object({
  name: z.string(),
  description: z.string(),
  address: z.string(),
  owner: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  menuItems: z.array(MenuItem),
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

router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const vRestaurant = Restaurant.parse({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      owner: req.body.owner,
      menuItems: req.body.menuItems,
      image: req.file.path.split("public").pop(),
    });

    const restaurant = new models.Restaurant(vRestaurant);

    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
});

router.post("/:id/menu", upload.single("food"), async (req, res) => {
  try {
    const vMenuItem = MenuItem.parse({
      restaurant: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.destination + "/" + req.file.filename,
      
    })
    

    const menuItem = new models.Menu(vMenuItem);

    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
});

router.put("/:id", upload.single("logo"), async (req, res) => {
  try {
    const vRestaurant = Restaurant.parse({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      owner: req.body.owner,
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
});
export default router;

// TODO: allow multiple file upload
// TODO: add images to different folders according to restaurant
// TODO: add put request for updating restaurant info
