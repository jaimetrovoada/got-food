import express, { NextFunction, Request, Response } from "express";
import models from "../model";
import multer from "multer";
import middleware from "../utils/middleware";
import { uploadToFirebase } from "../lib/helpers";
import { MenuItem, Order, Restaurant, priceSchema } from "../lib/schemas";
import { IOrder } from "../model/order";
import { IMenu } from "../model/menu";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

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

router.get("/trending", async (req, res, next) => {
  try {
    const restaurants = await models.Restaurant.find({}).populate<{
      orders: IOrder[];
    }>("orders", {
      date: 1,
      status: 1,
    });

    // .filter((restaurant) => restaurant.orders.length > 0)
    const top5 = restaurants
      .sort((a, b) => {
        return b.orders.length - a.orders.length;
      })
      .slice(0, 5);

    res.json(top5);
  } catch (err) {
    console.log({ err });
    next(err);
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

router.get("/:id/orders", async (req, res) => {
  try {
    const restaurant = await models.Restaurant.findById(req.params.id).populate(
      {
        path: "orders",
        populate: [
          {
            path: "orderedItems",
            populate: {
              path: "item",
            },
          },
          {
            path: "restaurant",
            select: {
              name: 1,
            },
          },
        ],
        select: {
          restaurant: 1,
          totalPrice: 1,
          items: 1,
          date: 1,
          tableNumber: 1,
          status: 1,
        },
      }
    );
    const orders = restaurant.orders;

    res.json(orders);
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

    const restaurant = await models.Restaurant.findById(req.params.id);
    restaurant.orders = restaurant.orders.concat(result._id);
    await restaurant.save();

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
      const restaurant = await models.Restaurant.findById(req.params.id);
      const logo = req.file ? await uploadToFirebase(req) : restaurant.logo;
      const vRestaurant = Restaurant.parse({
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        owner: user._id,
        menuItems: req.body.menuItems,
        logo: logo,
      });

      restaurant.name = vRestaurant.name;
      restaurant.description = vRestaurant.description;
      restaurant.address = vRestaurant.address;
      restaurant.logo = vRestaurant.logo;

      const update = await restaurant.save();

      res.json(update);
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log({ err });
    }
  }
);

router.put(
  "/:id/menu/:menuId",
  upload.single("image"),
  async (req, res, next) => {
    const { id, menuId } = req.params;
    try {
      const restaurant = await models.Restaurant.findById(id).populate<{
        menuItems: IMenu[];
      }>("menuItems");
      const menuItem = await models.Menu.findById(menuId);

      const imgUrl = req.file ? await uploadToFirebase(req) : menuItem.image;

      const vMenuItem = MenuItem.parse({
        name: req.body.name,
        description: req.body.description,
        price: priceSchema.parse(req.body.price),
        category: req.body.category,
        image: imgUrl,
      });

      menuItem.name = vMenuItem.name;
      menuItem.description = vMenuItem.description;
      menuItem.price = vMenuItem.price;
      menuItem.category = vMenuItem.category;
      menuItem.image = vMenuItem.image;
      const updatedMenuItem = await menuItem.save();
      const restMenuItem = restaurant.menuItems.find(
        (m) => m._id.toString() === menuId
      );
      restMenuItem.name = updatedMenuItem.name;
      restMenuItem.description = updatedMenuItem.description;
      restMenuItem.price = updatedMenuItem.price;
      restMenuItem.category = updatedMenuItem.category;
      restMenuItem.image = updatedMenuItem.image;

      await restaurant.save();

      res.json(updatedMenuItem);
    } catch (err) {
      next(err);
    }
  }
);

router.put("/:id/order/:orderId", async (req, res, next) => {
  const { orderId, id } = req.params;
  try {
    const order = await models.Order.findById(orderId);
    const restaurant = await models.Restaurant.findById(id).populate<{
      orders: IOrder[];
    }>("orders");
    const restOrder = restaurant.orders.find(
      (o) => o._id.toString() === orderId
    );

    const vOrderStatus = Order.shape.status.parse(req.body.status);
    order.status = vOrderStatus;
    const updatedOrder = await order.save();
    restOrder.status = vOrderStatus;
    await restaurant.save();
    res.json(updatedOrder);
  } catch (err) {
    console.log({ err });
    next(err);
  }
});
export default router;
