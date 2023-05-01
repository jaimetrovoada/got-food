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

const Order = z.object({
  tableNumber: z.number(),
  orderedItems: z.array(
    z.object({
      item: z.string(),
      amount: z.number(),
    })
  ),
  totalPrice: z.number(),
  status: z.enum(["pending", "fullfilled"]),
});

function getExtensionFromMimeType(mimeType: string): string {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      throw new Error(`Unsupported mimetype: ${mimeType}`);
  }
}

function getContentTypeFromMimeType(mimeType: string): string {
  return mimeType;
}

const uploadToFirebase = async (req: Request) => {
  const id = nanoid();
  const mimeType = req.file.mimetype;
  const extension = getExtensionFromMimeType(mimeType);
  const contentType = getContentTypeFromMimeType(mimeType);

  const imgName = `${id}.${extension}`;

  const file = bucket.file(imgName);
  const firebaseImgUrlPromise = new Promise((resolve, reject) => {
    const stream = file.createWriteStream({ contentType });

    stream.on("error", (error) => {
      reject(error);
    });

    stream.on("finish", async () => {
      const firebaseImgUrl = await file.getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });

      resolve(firebaseImgUrl[0]);
    });

    stream.end(req.file.buffer);
  });
  const firebaseImgUrl = await firebaseImgUrlPromise;
  return firebaseImgUrl;
};

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
      const firebaseImgUrl = await uploadToFirebase(req);

      const vRestaurant = Restaurant.parse({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        menuItems: req.body.menuItems || [],
        logo: firebaseImgUrl,
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
    const firebaseImgUrl = await uploadToFirebase(req);

    const priceSchema = z.coerce.number();
    const vMenuItem = MenuItem.parse({
      restaurant: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: priceSchema.parse(req.body.price),
      category: req.body.category,
      image: firebaseImgUrl,
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

router.post("/:id/order", middleware.userExtractor, async (req, res) => {
  try {
    const vOrder = Order.parse({
      tableNumber: req.body.tableNumber,
      orderedItems: req.body.items,
      totalPrice: req.body.totalPrice,
      status: req.body.status,
    });

    const order = new models.Order({
      ...vOrder,
      user: req.user._id,
      restaurant: req.params.id,
    });
    const result = await order.save();
    const user = await models.User.findById(req.user._id);
    user.orders = user.orders.concat(result._id);
    await user.save();

    res.status(201).json(result);
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
