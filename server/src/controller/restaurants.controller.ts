import { NextFunction, Request, Response } from "express";
import { User } from "../model/user";
import { Restaurant } from "../model/restaurant";
import { Order } from "../model/order";
import { Menu } from "../model/menu";
import { uploadToFirebase } from "../lib/helpers";
import {
  MenuItemSchema,
  OrderSchema,
  RestaurantSchema,
  PriceSchema,
} from "../lib/schemas";
import { AppDataSource } from "../data-source";

const menuRepository = AppDataSource.getRepository(Menu);
const restaurantRepository = AppDataSource.getRepository(Restaurant);
const orderRepository = AppDataSource.getRepository(Order);
const userRepository = AppDataSource.getRepository(User);

export const getRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurants = await restaurantRepository.find({});

    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
};
export const getTrendingRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurants = await restaurantRepository.find();

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
};

export const getRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurant = await restaurantRepository.findOneBy({
      id: req.params.id,
    });

    res.json(restaurant);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
};

export const getRestaurantMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurant = await restaurantRepository.findOneBy({
      id: req.params.id,
    });

    const menu = restaurant.menuItems;

    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
};

export const getRestaurantOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const restaurant = await restaurantRepository.findOneBy({
      id: req.params.id,
    });
    const orders = restaurant.orders;

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
};
/* 
export const getRestaurantOrdersStream = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const cursor = await Order.findBy({
    restaurant: { id: req.params.id) },
  }).stream();

  const sendEvent = (order) => {
    res.write(`data: ${JSON.stringify(order)}\n\n`);
  };

  const sendStreamClosedEvent = () => {
    res.write("event: streamClosed\ndata: Stream closed\n\n");
    res.end();
  };

  cursor.on("data", sendEvent);
  cursor.on("close", sendStreamClosedEvent);
  cursor.on("error", (error) => {
    sendStreamClosedEvent();
    next(error);
  });
};
 */
export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  try {
    const firebaseImgUrl = await uploadToFirebase(req);

    const vRestaurant = RestaurantSchema.parse({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      menuItems: req.body.menuItems || [],
      logo: firebaseImgUrl,
    });

    const restaurant = new Restaurant();
    restaurant.name = vRestaurant.name;
    restaurant.description = vRestaurant.description;
    restaurant.address = vRestaurant.address;
    restaurant.logo = firebaseImgUrl as string;
    user.restaurants = [restaurant];

    const result = await userRepository.save(user);

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
export const createMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const firebaseImgUrl = await uploadToFirebase(req);

    const vMenuItem = MenuItemSchema.parse({
      restaurant: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: PriceSchema.parse(req.body.price),
      category: req.body.category,
      image: firebaseImgUrl,
    });

    const restaurant = await restaurantRepository.findOneBy({
      id: req.params.id,
    });
    const menuItem = new Menu();
    menuItem.name = vMenuItem.name;
    menuItem.description = vMenuItem.description;
    menuItem.price = vMenuItem.price;
    menuItem.category = vMenuItem.category;
    menuItem.image = firebaseImgUrl as string;
    menuItem.restaurant = restaurant;

    const result = await menuRepository.save(menuItem);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  try {
    const vOrder = OrderSchema.parse({
      tableNumber: req.body.tableNumber,
      orderedItems: req.body.items,
      totalPrice: req.body.totalPrice,
      status: req.body.status,
    });

    const user = await userRepository.findOneBy({
      id: req.user.id,
    });
    const restaurant = await restaurantRepository.findOneBy({
      id: req.params.id,
    });
    const order = new Order();
    order.tableNumber = vOrder.tableNumber;
    order.totalPrice = vOrder.totalPrice;
    order.status = vOrder.status;
    order.user = user;
    order.restaurant = restaurant;

    const result = await orderRepository.save(order);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
};

export const updateRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user } = req;
  try {
    const restaurant = await restaurantRepository.findOneBy({
      id: req.params.id,
    });
    const logo = req.file ? await uploadToFirebase(req) : restaurant.logo;
    const vRestaurant = RestaurantSchema.parse({
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      owner: user.id,
      menuItems: req.body.menuItems,
      logo: logo,
    });

    restaurant.name = vRestaurant.name;
    restaurant.description = vRestaurant.description;
    restaurant.address = vRestaurant.address;
    restaurant.logo = vRestaurant.logo;

    const update = await restaurantRepository.save(restaurant);

    res.json(update);
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log({ err });
  }
};

export const updateMenuItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, menuId } = req.params;
  try {
    const restaurant = await restaurantRepository.findOneBy({
      id: id,
    });
    const menuItem = await menuRepository.findOneBy({
      id: menuId,
    });

    const imgUrl = req.file ? await uploadToFirebase(req) : menuItem.image;

    const vMenuItem = MenuItemSchema.parse({
      name: req.body.name,
      description: req.body.description,
      price: PriceSchema.parse(req.body.price),
      category: req.body.category,
      image: imgUrl,
    });

    menuItem.name = vMenuItem.name;
    menuItem.description = vMenuItem.description;
    menuItem.price = vMenuItem.price;
    menuItem.category = vMenuItem.category;
    menuItem.image = vMenuItem.image;
    const updatedMenuItem = await menuRepository.save(menuItem);

    res.json(updatedMenuItem);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { orderId } = req.params;
  try {
    const order = await orderRepository.findOneBy({
      id: orderId,
    });

    const vOrderStatus = OrderSchema.shape.status.parse(req.body.status);
    order.status = vOrderStatus;
    const updatedOrder = await orderRepository.save(order);
    res.json(updatedOrder);
  } catch (err) {
    console.log({ err });
    next(err);
  }
};
