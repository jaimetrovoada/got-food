import express from "express";
import models from "../model";
import multer from "multer";

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
    const _restaurant = {
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      menuItems: [],
      // owner: req.body.owner,
      image: req.file.destination + "/" + req.file.filename,
    };

    const restaurant = new models.Restaurant(_restaurant);

    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
});

router.post("/:id/menu", upload.single("food"), async (req, res) => {
  try {
    const _menuItem = {
      restaurant: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: req.file.destination + "/" + req.file.filename,
    };

    const menuItem = new models.Menu(_menuItem);

    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
});

export default router;

// TODO: allow multiple file upload
// TODO: add images to different folders according to restaurant
// TODO: add put request for updating restaurant info
